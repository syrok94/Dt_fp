package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.backend.dto.CommentDTO;
import app.backend.dto.UserDTO;
import app.backend.entity.Comment;
import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import app.backend.repository.CommentRepository;
import app.backend.repository.TaskRepository;
import app.backend.repository.UserInfoRepository;
@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	TaskRepository taskRepo;
	
	@Autowired
	UserInfoRepository userRepo;

	@Override
	public CommentDTO getComment(UUID commentId) {
		Optional<Comment> optComment = commentRepo.findById(commentId);
		if(optComment.isPresent()) {
			Comment comment = optComment.get();
			UserDTO userDTO = new UserDTO();
			CommentDTO dtoComment = new CommentDTO();
			BeanUtils.copyProperties(comment, dtoComment);
			BeanUtils.copyProperties(comment.getUser(), userDTO);
			dtoComment.setTask_id(comment.getTask().getTask_id());
			dtoComment.setUser(userDTO);
			return dtoComment;
		}
		return null;
	}

	@Override
	public List<CommentDTO> getAllComment(UUID taskId) {
		Optional<Task> optTask = taskRepo.findById(taskId);
		List<CommentDTO> allCommentDTO = new ArrayList<CommentDTO>();
		if(optTask.isPresent()) {
			List<Comment> allComment = commentRepo.findByTask(optTask.get());
			for(Comment comment: allComment) {
				CommentDTO commentDTO = new CommentDTO();
				UserDTO userDTO = new UserDTO();
				BeanUtils.copyProperties(comment, commentDTO);
				BeanUtils.copyProperties(comment.getUser(), userDTO);
				commentDTO.setTask_id(comment.getTask().getTask_id());
				commentDTO.setUser(userDTO);
				allCommentDTO.add(commentDTO);
			}
			return allCommentDTO;
		}
		return null;
	}

	@Override
	public CommentDTO addComment(CommentDTO commentDTO) {
		Comment comment = new Comment();
		Optional<Task> optTask = taskRepo.findById(commentDTO.getTask_id());
		Optional<UserInfo> optUser = userRepo.findById(commentDTO.getUser().getId());
		if(optTask.isPresent() && optUser.isPresent()) {
			BeanUtils.copyProperties(commentDTO, comment);
			UserDTO userDTO = new UserDTO();
			comment.setTask(optTask.get());
			comment.setUser(optUser.get());
			comment = commentRepo.save(comment);
			BeanUtils.copyProperties(comment, commentDTO);
			BeanUtils.copyProperties(optUser.get(), userDTO);
			commentDTO.setTask_id(comment.getTask().getTask_id());
			commentDTO.setUser(userDTO);
			return commentDTO;
		}
		return null;
	}

	@Override
	public boolean removeComment(UUID commentId) {
		Optional<Comment> optComment = commentRepo.findById(commentId);
		if(optComment.isPresent()) {
			commentRepo.delete(optComment.get());
			return true;
		}
		return false;
	}

}
