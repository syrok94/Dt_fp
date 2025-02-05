package app.backend.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import app.backend.enums.StatusEnum;
import app.backend.enums.StoryPointEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID task_id;
	
	private String title;
	private String description;
	
	private UUID assignorId;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum status;
	
	@Enumerated(EnumType.STRING)
	private StoryPointEnum storyPoint;
	
	@ManyToOne
	@JoinColumn(name = "assigned_to", referencedColumnName = "id")
	private UserInfo assignedTo;
	
	@ManyToOne
	@JoinColumn(name = "board_id", referencedColumnName = "board_id")
	private Board board;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Comment> comments;
	
	@PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;  
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

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

	

	public UserInfo getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(UserInfo assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
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

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public UUID getAssignorId() {
		return assignorId;
	}

	public void setAssignorId(UUID assignorId) {
		this.assignorId = assignorId;
	}
	
}
