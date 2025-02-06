package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.BoardDTO;

public interface BoardService {
	
	public BoardDTO getBoard(UUID boardId);
	public List<BoardDTO> getAllBoard(UUID userId);
	public BoardDTO addBoard(BoardDTO boardDTO);
	public boolean removeBoard(UUID boardId);
	public BoardDTO updateBoard(UUID boardId, BoardDTO boardDTO);
}
