package app.backend.entity;

import java.security.Timestamp;
import java.util.List;
import java.util.UUID;

import app.backend.enums.StatusEnum;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	private String title;
	private String description;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum status;
	
	@ManyToOne
	@JoinColumn(name = "assigned_to")
	private UserInfo assignedTo;
	
	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;
	
	private Timestamp createdAt;
	private Timestamp updatedAt;
	
	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
	private List<Comment> comments;
}
