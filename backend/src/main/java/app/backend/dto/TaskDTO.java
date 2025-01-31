package app.backend.dto;

import java.security.Timestamp;
import java.util.List;
import app.backend.entity.Board;
import app.backend.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskDTO {

	private long id;
	
	private String title;
	private String description;
	
	private StatusEnum status;
	
//	private UserDTO assignedTo;
	
	private Board board;
	
	private Timestamp createdAt;
	private Timestamp updatedAt;
	
	private List<CommentDTO> comments;
}

