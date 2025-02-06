package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.BoardDTO;
import app.backend.dto.CommentDTO;
import app.backend.dto.TaskDTO;
import app.backend.dto.UserDTO;
import app.backend.entity.Board;
import app.backend.entity.Comment;
import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import app.backend.repository.BoardRepository;
import app.backend.repository.UserInfoRepository;
@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardRepository boardRepo;
	
	@Autowired
	UserInfoRepository userRepo;

	@Override
	public BoardDTO getBoard(UUID boardId) {
		Optional<Board> optBoard = boardRepo.findById(boardId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			BoardDTO boardDTO = new BoardDTO();
			List<Task> allTask = board.getTasks();
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				List<CommentDTO> allCommentDTO = new ArrayList<CommentDTO>();
				for(Comment comment : task.getComments()) {
					CommentDTO commentDTO = new CommentDTO();
					UserDTO userDTO = new UserDTO();
					BeanUtils.copyProperties(comment, commentDTO);
					BeanUtils.copyProperties(comment.getUser(), userDTO);
					commentDTO.setTask_id(comment.getTask().getTask_id());
					commentDTO.setUser(userDTO);
					allCommentDTO.add(commentDTO);
				}
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				taskDTO.setComments(allCommentDTO);
				allTaskDTO.add(taskDTO);
			}
			BeanUtils.copyProperties(board, boardDTO);
			boardDTO.setTasks(allTaskDTO);
			return boardDTO;
		}
		return null;
	}

	@Override
	public BoardDTO addBoard(BoardDTO boardDTO) {
		Board board = new Board();
		BeanUtils.copyProperties(boardDTO, board);
		board = boardRepo.save(board);
		BeanUtils.copyProperties(board, boardDTO);
		return boardDTO;
	}

	@Override
	public boolean removeBoard(UUID boardId) {
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			boardRepo.delete(board);
			return true;
		}
		return false;
	}

	@Override
	public BoardDTO updateBoard(UUID boardId, BoardDTO boardDTO) {
	    Optional<Board> optBoard = boardRepo.findById(boardId);

	    if (optBoard.isPresent()) {
	        Board board = optBoard.get();
	        List<Task> existingTasks = board.getTasks();

	        // Remove orphaned tasks
	        existingTasks.removeIf(task -> boardDTO.getTasks().stream()
	                .noneMatch(dtoTask -> dtoTask.getTask_id().equals(task.getTask_id())));

	        for (TaskDTO dtoTask : boardDTO.getTasks()) {
	            Task task;
	            
	            if (dtoTask.getTask_id() != null) {
	                Optional<Task> existingTask = existingTasks.stream()
	                        .filter(t -> t.getTask_id().equals(dtoTask.getTask_id()))
	                        .findFirst();
	                
	                if (existingTask.isPresent()) {
	                    task = existingTask.get();
	                } else {
	                    task = new Task();
	                }
	            } else {
	                task = new Task();
	            }

	            BeanUtils.copyProperties(dtoTask, task);
	            task.setBoard(board);

	            UUID userId = dtoTask.getAssignedToId();
	            Optional<UserInfo> optUser = userRepo.findById(userId);
	            optUser.ifPresent(task::setAssignedTo);

	            if (!existingTasks.contains(task)) {
	                existingTasks.add(task);
	            }
	        }

	        boardRepo.save(board);
	        return boardDTO;
	    }
	    return null;
	}


	@Override
	public List<BoardDTO> getAllBoard(UUID userId) {
		Optional<UserInfo> optUser = userRepo.findById(userId);
		if(optUser.isPresent()) {
			List<Board> allBoard = boardRepo.findByCreatedBy(userId);
			List<BoardDTO> finalList = new ArrayList<BoardDTO>();
			List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
			for(Board board: allBoard) {
				BoardDTO dtoBoard = new BoardDTO();
				List<Task> allTask = board.getTasks();
				for(Task task: allTask) {
					TaskDTO taskDTO = new TaskDTO();
					BeanUtils.copyProperties(task, taskDTO);
					List<CommentDTO> allCommentDTO = new ArrayList<CommentDTO>();
					for(Comment comment : task.getComments()) {
						CommentDTO commentDTO = new CommentDTO();
						UserDTO userDTO = new UserDTO();
						BeanUtils.copyProperties(comment, commentDTO);
						BeanUtils.copyProperties(comment.getUser(), userDTO);
						commentDTO.setTask_id(comment.getTask().getTask_id());
						commentDTO.setUser(userDTO);
						allCommentDTO.add(commentDTO);
					}
					taskDTO.setAssignedToId(task.getAssignedTo().getId());
					taskDTO.setBoardId(task.getBoard().getBoardId());
					taskDTO.setComments(allCommentDTO);
					allTaskDTO.add(taskDTO);
				}
				BeanUtils.copyProperties(board, dtoBoard);
				dtoBoard.setTasks(allTaskDTO);
				finalList.add(dtoBoard);
			}
			return finalList;
		}
		return null;
	}

}
