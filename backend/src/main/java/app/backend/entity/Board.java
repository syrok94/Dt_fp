package app.backend.entity;

import java.util.List;
import java.util.UUID;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
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
@Table(name="boards")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Board {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	private String name;
	
	@ManyToOne
	@JoinColumn(name="created_by")
	private UserInfo createdBy;
	
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private List<Task> tasks;
	
}
