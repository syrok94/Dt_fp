package app.backend.service;

import java.util.List;

import app.backend.dto.CommentDTO;


public interface CommentService {

	public CommentDTO getBoard(long commentId);
	public List<CommentDTO> getAllBoard();
	public boolean addBoard(CommentDTO commentDTO);
	public boolean removeBoard(long commentId);
	public CommentDTO updateBoard(long commentId, CommentDTO commentDTO);
}
