package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.BoardDTO;
import app.backend.entity.Board;
import app.backend.repository.BoardRepository;
@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardRepository boardRepo;

	@Override
	public BoardDTO getBoard(long boardId) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			BoardDTO boardDTO = new BoardDTO();
			BeanUtils.copyProperties(board, boardDTO);
			return boardDTO;
		}
		return null;
	}

	@Override
	public List<BoardDTO> getAllBoard() {
		// TODO Auto-generated method stub
		List<Board> allBoard = boardRepo.findAll();
		List<BoardDTO> allBoardDTO = new ArrayList<BoardDTO>();
		for(Board board: allBoard) {
			BoardDTO boardDTO = new BoardDTO();
			BeanUtils.copyProperties(board, boardDTO);
			allBoardDTO.add(boardDTO);
		}
		return allBoardDTO;
	}

	@Override
	public boolean addBoard(BoardDTO boardDTO) {
		// TODO Auto-generated method stub
		Board board = new Board();
		BeanUtils.copyProperties(boardDTO, board);
		boardRepo.save(board);
		return true;
	}

	@Override
	public boolean removeBoard(long boardId) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			boardRepo.delete(board);
			return true;
		}
		return false;
	}

	@Override
	public BoardDTO updateBoard(long boardId, BoardDTO boardDTO) {
		// TODO Auto-generated method stub
		Optional<Board> optBoard = boardRepo.findById(boardId);
		if(optBoard.isPresent()) {
			Board board = optBoard.get();
			BeanUtils.copyProperties(boardDTO, board);
			boardRepo.save(board);
			return boardDTO;
		}
		return null;
	}

}
