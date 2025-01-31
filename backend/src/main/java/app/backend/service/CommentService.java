package app.backend.service;

import java.util.List;

import app.backend.dto.CommentDTO;


public interface CommentService {

	public CommentDTO getComment(long commentId);
	public List<CommentDTO> getAllComment();
	public boolean addComment(CommentDTO commentDTO);
	public boolean removeComment(long commentId);
	public CommentDTO updateComment(long commentId, CommentDTO commentDTO);
}
