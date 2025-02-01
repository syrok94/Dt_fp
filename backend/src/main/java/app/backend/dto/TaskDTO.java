package app.backend.dto;

import java.security.Timestamp;
import java.util.List;
import java.util.UUID;

import app.backend.entity.Board;
import app.backend.entity.UserInfo;
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

	private UUID id;
	
	private String title;
	private String description;
	
	private StatusEnum status;
	
	private UserInfo assignedTo; //should be changed to UserDTO
	
	private Board board;
	
	private Timestamp createdAt;
	private Timestamp updatedAt;
	
	private List<CommentDTO> comments;
}

