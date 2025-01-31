package app.backend.dto;

import java.security.Timestamp;
import app.backend.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDTO {
	
	private long id;
	
	private Task task;
	
//	private UserDTO user;
	
	private String Content;
	
	private Timestamp createdAt;
}
