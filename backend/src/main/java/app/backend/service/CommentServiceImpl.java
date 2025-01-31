package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.CommentDTO;
import app.backend.entity.Comment;
import app.backend.repository.CommentRepository;
@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentRepository commentRepo;

	@Override
	public CommentDTO getComment(long commentId) {
		// TODO Auto-generated method stub
		Optional<Comment> optComment = commentRepo.findById(commentId);
		if(optComment.isPresent()) {
			Comment comment = optComment.get();
			CommentDTO commentDTO = new CommentDTO();
			BeanUtils.copyProperties(comment, commentDTO);
			return commentDTO;
		}
		return null;
	}

	@Override
	public List<CommentDTO> getAllComment() {
		// TODO Auto-generated method stub
		List<Comment> allComment = commentRepo.findAll();
		List<CommentDTO> allCommentDTO = new ArrayList<CommentDTO>();
		for(Comment comment: allComment) {
			CommentDTO commentDTO = new CommentDTO();
			BeanUtils.copyProperties(comment, commentDTO);
			allCommentDTO.add(commentDTO);
		}
		return allCommentDTO;
	}

	@Override
	public boolean addComment(CommentDTO commentDTO) {
		// TODO Auto-generated method stub
		Comment comment = new Comment();
		BeanUtils.copyProperties(commentDTO, comment);
		commentRepo.save(comment);
		return true;
	}

	@Override
	public boolean removeComment(long commentId) {
		// TODO Auto-generated method stub
		Optional<Comment> optComment = commentRepo.findById(commentId);
		if(optComment.isPresent()) {
			Comment comment = optComment.get();
			commentRepo.save(comment);
			return true;
		}
		return false;
	}

	@Override
	public CommentDTO updateComment(long commentId, CommentDTO commentDTO) {
		// TODO Auto-generated method stub
		Optional<Comment> optComment = commentRepo.findById(commentId);
		if(optComment.isPresent()) {
			Comment comment = optComment.get();
			BeanUtils.copyProperties(commentDTO, comment);
			commentRepo.save(comment);
			return commentDTO;
		}
		return null;
	}

}
