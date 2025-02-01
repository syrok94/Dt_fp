package app.backend.dto;

import java.util.List;
import java.util.UUID;

import app.backend.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardDTO {
	
	private UUID id;
	
	private String name;
	
	private UserInfo createdBy; //should be changed to UserDTO
	
	private List<TaskDTO> tasks;
	
}
