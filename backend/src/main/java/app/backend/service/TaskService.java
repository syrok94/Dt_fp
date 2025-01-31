package app.backend.service;

import java.util.List;

import app.backend.dto.BoardDTO;
import app.backend.dto.TaskDTO;

public interface TaskService {
	
	public TaskDTO getTask(long taskId);
	public List<TaskDTO> getAllTask();
	public boolean addTask(TaskDTO taskDTO);
	public boolean removeTask(long taskId);
	public TaskDTO updateTask(long taskId, TaskDTO taskDTO);
}
