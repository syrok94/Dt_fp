package app.backend.entity;

import java.security.Timestamp;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="comments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@ManyToOne
	@JoinColumn(name = "task_id")
	private Task task;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserInfo user;
	
	private String Content;
	
	private Timestamp createdAt;
}
