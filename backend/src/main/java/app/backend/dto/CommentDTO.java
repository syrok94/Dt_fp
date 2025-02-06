package app.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CommentDTO {
	
	private UUID commentId;
	
	private UUID task_id;
	
	private UserDTO user; 
	
	private String content;
	
	private LocalDateTime createdAt;

	public UUID getCommentId() {
		return commentId;
	}

	public void setCommentId(UUID commentId) {
		this.commentId = commentId;
	}

	public UUID getTask_id() {
		return task_id;
	}

	public void setTask_id(UUID task_id) {
		this.task_id = task_id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
