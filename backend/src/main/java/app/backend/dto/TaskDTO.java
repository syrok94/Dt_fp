package app.backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import app.backend.entity.Comment;
import app.backend.enums.StatusEnum;
import app.backend.enums.StoryPointEnum;

public class TaskDTO {

private UUID task_id;
	
	private String title;
	private String description;
	
	private UUID assignorId;
	
	private StatusEnum status;
	
	private StoryPointEnum storyPoint;
	
	private UUID assignedToId;
	
	private UUID boardId;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private List<CommentDTO> comments;
	

	public UUID getTask_id() {
		return task_id;
	}

	public void setTask_id(UUID task_id) {
		this.task_id = task_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public StoryPointEnum getStoryPoint() {
		return storyPoint;
	}

	public void setStoryPoint(StoryPointEnum storyPoint) {
		this.storyPoint = storyPoint;
	}

	public UUID getAssignedToId() {
		return assignedToId;
	}

	public void setAssignedToId(UUID assignedTo) {
		this.assignedToId = assignedTo;
	}

	public UUID getBoardId() {
		return boardId;
	}

	public void setBoardId(UUID board) {
		this.boardId = board;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<CommentDTO> getComments() {
		return comments;
	}

	public void setComments(List<CommentDTO> comments) {
		this.comments = comments;
	}
	
	public UUID getAssignorId() {
		return assignorId;
	}

	public void setAssignorId(UUID assignorId) {
		this.assignorId = assignorId;
	}
	
}

