package app.backend.service;

import java.util.List;
import java.util.UUID;

import app.backend.dto.TaskDTO;

public interface TaskService {
	
	public TaskDTO getTask(UUID taskId);
	public List<TaskDTO> getAllTask();
	public List<TaskDTO> getAllTaskByUserId(UUID userID);
	public String addTask(TaskDTO taskDTO);
	public String removeTask(UUID taskId);
	public TaskDTO updateTask(UUID taskId, TaskDTO taskDTO);
}
