package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.BoardDTO;
import app.backend.dto.TaskDTO;
import app.backend.entity.Board;
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
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			BoardDTO boardDTO = new BoardDTO();
			List<Task> allTask = board.getTasks();
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				allTaskDTO.add(taskDTO);
			}
			BeanUtils.copyProperties(board, boardDTO);
			boardDTO.setTasks(allTaskDTO);
			return boardDTO;
		}
		return null;
	}

	@Override
	public List<BoardDTO> getAllBoard() {
		// TODO Auto-generated method stub
		List<Board> allBoard = boardRepo.findAll();
		List<BoardDTO> allBoardDTO = new ArrayList<BoardDTO>();
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		for(Board board: allBoard) {
			BoardDTO boardDTO = new BoardDTO();
			List<Task> allTask = board.getTasks();
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				allTaskDTO.add(taskDTO);
			}
			BeanUtils.copyProperties(board, boardDTO);
			boardDTO.setTasks(allTaskDTO);
			allBoardDTO.add(boardDTO);
		}
		return allBoardDTO;
	}

	@Override
	public BoardDTO addBoard(BoardDTO boardDTO) {
		// TODO Auto-generated method stub
		Board board = new Board();
		BeanUtils.copyProperties(boardDTO, board);
		board = boardRepo.save(board);
		BeanUtils.copyProperties(board, boardDTO);
		return boardDTO;
	}

	@Override
	public String removeBoard(UUID boardId) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			boardRepo.delete(board);
			return "Board removed successfully";
		}
		return "Board removal failure";
	}

	@Override
	public BoardDTO updateBoard(UUID boardId, BoardDTO boardDTO) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		List<Task> allTask = new ArrayList<Task>();
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			List<TaskDTO> allDTOTask = boardDTO.getTasks();
			for(TaskDTO dtoTask: allDTOTask) {
				Task task = new Task();
				UUID userId = dtoTask.getAssignedToId();
				Optional<UserInfo> optUser = userRepo.findById(userId);
				if(optUser.isPresent()) {
					BeanUtils.copyProperties(dtoTask, task);
					task.setAssignedTo(optUser.get());
					task.setBoard(optBoard.get());
				}
				allTask.add(task);
			}
			BeanUtils.copyProperties(boardDTO, board);
			board.setTasks(allTask);
			boardRepo.save(board);
			return boardDTO;
		}
		return null;
	}

	@Override
	public List<BoardDTO> getAllBoardByUserId(UUID userId) {
		// TODO Auto-generated method stub
		List<Board> allBoard = boardRepo.findByCreatedBy(userId);
		List<BoardDTO> finalList = new ArrayList<BoardDTO>();
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		for(Board board: allBoard) {
			BoardDTO dtoBoard = new BoardDTO();
			List<Task> allTask = board.getTasks();
			for(Task task: allTask) {
				TaskDTO taskDTO = new TaskDTO();
				BeanUtils.copyProperties(task, taskDTO);
				taskDTO.setAssignedToId(task.getAssignedTo().getId());
				taskDTO.setBoardId(task.getBoard().getBoardId());
				allTaskDTO.add(taskDTO);
			}
			BeanUtils.copyProperties(board, dtoBoard);
			dtoBoard.setTasks(allTaskDTO);
			finalList.add(dtoBoard);
		}
		return finalList;
	}

}
