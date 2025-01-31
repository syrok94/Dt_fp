package app.backend.service;

import java.util.List;

import app.backend.dto.BoardDTO;

public interface BoardService {
	
	public BoardDTO getBoard(long boardId);
	public List<BoardDTO> getAllBoard();
	public boolean addBoard(BoardDTO boardDTO);
	public boolean removeBoard(long boardId);
	public BoardDTO updateBoard(long boardId, BoardDTO boardDTO);
}
