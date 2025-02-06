package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.TaskDTO;

public interface TaskService {
	
	public TaskDTO getTask(UUID taskId);
	public List<TaskDTO> getAllTask(UUID assignorId);
	public List<TaskDTO> getAllBoardTask(UUID boardId);
	public List<TaskDTO> getAllTaskByUserId(UUID userId);
	public TaskDTO addTask(TaskDTO taskDTO);
	public boolean removeTask(UUID taskId);
	public TaskDTO updateTask(UUID taskId, TaskDTO taskDTO);
}
