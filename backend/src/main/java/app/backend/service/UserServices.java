package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.UserDTO;

public interface UserServices {

	public boolean removeUser(UUID userId);
	public UserDTO updateUser(UUID userId, UserDTO dtoUser);
	public List<UserDTO> getAllDevelopers();
	public UserDTO getUser(String email);
	public UserDTO getUserById(UUID userId);
}
