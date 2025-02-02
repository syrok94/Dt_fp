package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.UserDTO;

public interface UserServices {

	public String removeUser(UUID userId);
	public UserDTO updateUser(UUID userId, UserDTO dtoUser);
	public List<UserDTO> getAllUsers();
	public UserDTO getUser(String email);
}
