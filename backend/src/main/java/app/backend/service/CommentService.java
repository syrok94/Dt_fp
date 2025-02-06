package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.CommentDTO;


public interface CommentService {

	public CommentDTO getComment(UUID commentId);
	public List<CommentDTO> getAllComment(UUID taskId);
	public CommentDTO addComment(CommentDTO commentDTO);
	public boolean removeComment(UUID commentId);
}
