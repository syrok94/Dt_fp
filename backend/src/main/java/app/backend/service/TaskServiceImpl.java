package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.CommentDTO;
import app.backend.dto.TaskDTO;
import app.backend.dto.UserDTO;
import app.backend.entity.Board;
import app.backend.entity.Comment;
import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import app.backend.repository.BoardRepository;
import app.backend.repository.TaskRepository;
import app.backend.repository.UserInfoRepository;
import jakarta.transaction.Transactional;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskRepo;

	@Autowired
	UserInfoRepository userRepo;

	@Autowired
	BoardRepository boardRepo;

	@Override
	public TaskDTO getTask(UUID taskId) {
		Optional<Task> optTask = taskRepo.findById(taskId);
		if (optTask.isPresent()) {
			Task task = optTask.get();
			TaskDTO taskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, taskDTO);
			List<CommentDTO> allComments = new ArrayList<CommentDTO>();
			for (Comment comment : task.getComments()) {
				CommentDTO commentDTO = new CommentDTO();
				UserDTO userDTO = new UserDTO();
				BeanUtils.copyProperties(comment, commentDTO);
				BeanUtils.copyProperties(comment.getUser(), userDTO);
				commentDTO.setUser(userDTO);
				commentDTO.setTask_id(comment.getTask().getTask_id());
				allComments.add(commentDTO);
			}
			taskDTO.setAssignedToId(task.getAssignedTo().getId());
			taskDTO.setBoardId(task.getBoard().getBoardId());
			taskDTO.setComments(allComments);
			return taskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTask(UUID assignorId) {
		Optional<UserInfo> optUser = userRepo.findById(assignorId);
		if (optUser.isPresent()) {
			List<Task> allTask = taskRepo.findByAssignorId(assignorId);
			List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
			for (Task task : allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				List<CommentDTO> allComments = new ArrayList<CommentDTO>();
				for (Comment comment : task.getComments()) {
					CommentDTO commentDTO = new CommentDTO();
					UserDTO userDTO = new UserDTO();
					BeanUtils.copyProperties(comment, commentDTO);
					BeanUtils.copyProperties(comment.getUser(), userDTO);
					commentDTO.setUser(userDTO);
					commentDTO.setTask_id(comment.getTask().getTask_id());
					allComments.add(commentDTO);
				}
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				taskDTO.setComments(allComments);
				allTaskDTO.add(taskDTO);
			}
			return allTaskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTaskGlobal() {
	    List<Task> allTask = taskRepo.findAll();
	    List<TaskDTO> allTaskDTO = new ArrayList<>();

	    for (Task task : allTask) {
	        TaskDTO taskDTO = new TaskDTO();
	        BeanUtils.copyProperties(task, taskDTO);

	        List<CommentDTO> allComments = new ArrayList<>();
	        for (Comment comment : task.getComments()) {
	            CommentDTO commentDTO = new CommentDTO();
	            UserDTO userDTO = new UserDTO();
	            
	            BeanUtils.copyProperties(comment, commentDTO);
	            BeanUtils.copyProperties(comment.getUser(), userDTO);
	            
	            commentDTO.setUser(userDTO);
	            commentDTO.setTask_id(comment.getTask().getTask_id());
	            allComments.add(commentDTO);
	        }

	        taskDTO.setAssignedToId(task.getAssignedTo().getId());
	        taskDTO.setBoardId(task.getBoard().getBoardId());
	        taskDTO.setComments(allComments);

	        allTaskDTO.add(taskDTO); 
	    }

	    return allTaskDTO; 
	}

	@Override
	public TaskDTO addTask(TaskDTO taskDTO) {
		Task task = new Task();
		UUID boardId = taskDTO.getBoardId();
		UUID userId = taskDTO.getAssignedToId();
		UUID assignorId = taskDTO.getAssignorId();
		Optional<UserInfo> optUser = userRepo.findById(userId);
		Optional<Board> optBoard = boardRepo.findById(boardId);
		Optional<UserInfo> optAssignor = userRepo.findById(assignorId);
		if (optBoard.isPresent() && optUser.isPresent() && optAssignor.isPresent()) {
			BeanUtils.copyProperties(taskDTO, task);
			task.setAssignedTo(optUser.get());
			task.setBoard(optBoard.get());
			task = taskRepo.save(task);
			BeanUtils.copyProperties(task, taskDTO);
			taskDTO.setAssignedToId(task.getAssignedTo().getId());
			taskDTO.setBoardId(task.getBoard().getBoardId());
			return taskDTO;
		}
		return null;
	}

	@Override
	public boolean removeTask(UUID taskId) {
		Optional<Task> optTask = taskRepo.findById(taskId);
		if (optTask.isPresent()) {
			Task task = optTask.get();
			taskRepo.delete(task);
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public TaskDTO updateTask(UUID taskId, TaskDTO taskDTO) {
		Optional<Task> optTask = taskRepo.findById(taskId);
		Optional<UserInfo> optUser = userRepo.findById(taskDTO.getAssignedToId());
		Optional<Board> optBoard = boardRepo.findById(taskDTO.getBoardId());

		if (optTask.isPresent() && optBoard.isPresent() && optUser.isPresent()) {
			Task task = optTask.get();
			Board board = optBoard.get();
			UserInfo assignedUser = optUser.get();

			BeanUtils.copyProperties(taskDTO, task);
			task.setBoard(board);
			task.setAssignedTo(assignedUser);

			List<Comment> existingComments = task.getComments();

			List<UUID> dtoCommentIds = taskDTO.getComments().stream().map(CommentDTO::getCommentId)
					.collect(Collectors.toList());

			existingComments.removeIf(comment -> !dtoCommentIds.contains(comment.getCommentId()));

			for (CommentDTO commentDTO : taskDTO.getComments()) {
				Comment comment = existingComments.stream()
						.filter(c -> c.getCommentId().equals(commentDTO.getCommentId())).findFirst()
						.orElse(new Comment()); // Create if not found

				comment.setContent(commentDTO.getContent());
				comment.setTask(task);
				comment.setUser(assignedUser);

				if (!existingComments.contains(comment)) {
					existingComments.add(comment);
				}
			}

			task = taskRepo.save(task);
			TaskDTO updatedTaskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, updatedTaskDTO);
			updatedTaskDTO.setAssignedToId(task.getAssignedTo().getId());
			updatedTaskDTO.setBoardId(task.getBoard().getBoardId());

			List<CommentDTO> commentDTOs = new ArrayList<>();
			for (Comment comment : task.getComments()) {
				CommentDTO commentDTO = new CommentDTO();
				BeanUtils.copyProperties(comment, commentDTO);
				UserDTO userDTO = new UserDTO();
				BeanUtils.copyProperties(comment.getUser(), userDTO);
				commentDTO.setUser(userDTO);
				commentDTOs.add(commentDTO);
			}

			updatedTaskDTO.setComments(commentDTOs);
			return updatedTaskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTaskByUserId(UUID userId) {
		Optional<UserInfo> optUser = userRepo.findById(userId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if (optUser.isPresent()) {
			List<Task> allTask = taskRepo.findByAssignedTo(optUser.get());
			for (Task task : allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				List<CommentDTO> allComments = new ArrayList<CommentDTO>();
				for (Comment comment : task.getComments()) {
					CommentDTO commentDTO = new CommentDTO();
					UserDTO userDTO = new UserDTO();
					BeanUtils.copyProperties(comment, commentDTO);
					BeanUtils.copyProperties(comment.getUser(), userDTO);
					commentDTO.setUser(userDTO);
					commentDTO.setTask_id(comment.getTask().getTask_id());
					allComments.add(commentDTO);
				}
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				taskDTO.setComments(allComments);
				allTaskDTO.add(taskDTO);

			}
			return allTaskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllBoardTask(UUID boardId) {
		Optional<Board> optBoard = boardRepo.findById(boardId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if (optBoard.isPresent()) {
			List<Task> allTask = taskRepo.findByBoard(optBoard.get());
			for (Task task : allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				List<CommentDTO> allComments = new ArrayList<CommentDTO>();
				for (Comment comment : task.getComments()) {
					CommentDTO commentDTO = new CommentDTO();
					UserDTO userDTO = new UserDTO();
					BeanUtils.copyProperties(comment, commentDTO);
					BeanUtils.copyProperties(comment.getUser(), userDTO);
					commentDTO.setUser(userDTO);
					commentDTO.setTask_id(comment.getTask().getTask_id());
					allComments.add(commentDTO);
				}
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				taskDTO.setComments(allComments);
				allTaskDTO.add(taskDTO);
			}
			return allTaskDTO;
		}
		return null;
	}

}
