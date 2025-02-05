package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.TaskDTO;
import app.backend.entity.Board;
import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import app.backend.repository.BoardRepository;
import app.backend.repository.TaskRepository;
import app.backend.repository.UserInfoRepository;
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
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		if(optTask.isPresent()) {
			Task task = optTask.get();
			TaskDTO taskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, taskDTO);
			taskDTO.setAssignedToId(task.getAssignedTo().getId());
			taskDTO.setBoardId(task.getBoard().getBoardId());
			return taskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTask(UUID assignorId) {
		// TODO Auto-generated method stub
		List<Task> allTask = taskRepo.findByAssignorId(assignorId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		for(Task task: allTask) {
			TaskDTO taskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, taskDTO);
			taskDTO.setAssignedToId(task.getAssignedTo().getId());
			taskDTO.setBoardId(task.getBoard().getBoardId());
			allTaskDTO.add(taskDTO);
		}
		return allTaskDTO;
	}

	@Override
	public TaskDTO addTask(TaskDTO taskDTO) {
		// TODO Auto-generated method stub
		Task task = new Task();
		UUID boardId = taskDTO.getBoardId();
		UUID userId = taskDTO.getAssignedToId();
		Optional<UserInfo> optUser = userRepo.findById(userId);
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent() && optUser.isPresent()) {
			BeanUtils.copyProperties(taskDTO, task);
			task.setAssignedTo(optUser.get());
			task.setBoard(optBoard.get());
			task = taskRepo.save(task);
			BeanUtils.copyProperties(task, taskDTO);
			return taskDTO;
		}
		return null;
	}

	@Override
	public String removeTask(UUID taskId) {
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		if(optTask.isPresent()) {
			Task task = optTask.get();
			taskRepo.delete(task);
			return "Task removed sucessfully";
		}
		return "Task removal failure";
	}

	@Override
	public TaskDTO updateTask(UUID taskId, TaskDTO taskDTO) {
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		UUID boardId = taskDTO.getBoardId();
		UUID userId = taskDTO.getAssignedToId();
		Optional<UserInfo> optUser = userRepo.findById(userId);
		Optional<Board> optBoard = boardRepo.findById(boardId);

		if(optTask.isPresent() && optBoard.isPresent() && optUser.isPresent()) {
			Task task = optTask.get();
			BeanUtils.copyProperties(taskDTO, task);
			task = taskRepo.save(task);
			task.setAssignedTo(optUser.get());
			task.setBoard(optBoard.get());
			taskDTO.setAssignedToId(task.getAssignedTo().getId());
			taskDTO.setBoardId(task.getBoard().getBoardId());
			return taskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTaskByUserId(UUID userId) {
		// TODO Auto-generated method stub
		Optional<UserInfo> optUser = userRepo.findById(userId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if(optUser.isPresent()) {
			List<Task> allTask = taskRepo.findByAssignedTo(optUser.get());
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				allTaskDTO.add(taskDTO);
			}
		}
		return allTaskDTO;
	}

	@Override
	public List<TaskDTO> getAllBoardTask(UUID boardId) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if(optBoard.isPresent()) {
			List<Task> allTask = taskRepo.findByBoard(optBoard.get());
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				allTaskDTO.add(taskDTO);
			}
		}
		return allTaskDTO;
	}


}
