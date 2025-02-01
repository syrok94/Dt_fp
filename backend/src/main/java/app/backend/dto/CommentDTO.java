package app.backend.dto;

import java.security.Timestamp;
import java.util.UUID;

import app.backend.entity.Task;
import app.backend.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDTO {
	
	private UUID id;
	
	private Task task;
	
	private UserInfo user; //should be changed to UserDTO
	
	private String Content;
	
	private Timestamp createdAt;
}
