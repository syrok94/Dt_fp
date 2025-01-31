package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import app.backend.dto.BoardDTO;
import app.backend.dto.TaskDTO;
import app.backend.entity.Board;
import app.backend.entity.Task;
import app.backend.repository.BoardRepository;
import app.backend.repository.TaskRepository;

public class TaskServiceImpl implements TaskService {
	
	@Autowired
	TaskRepository taskRepo;

	@Override
	public TaskDTO getTask(long taskId) {
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		if(optTask.isPresent()) {
			Task task = optTask.get();
			TaskDTO taskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, taskDTO);
			return taskDTO;
		}
		return null;
	}

	@Override
	public List<TaskDTO> getAllTask() {
		// TODO Auto-generated method stub
		List<Task> allTask = taskRepo.findAll();
		List<TaskDTO> allTaskDTO = new ArrayList<TaskDTO>();
		for(Task task: allTask) {
			TaskDTO taskDTO = new TaskDTO();
			BeanUtils.copyProperties(task, taskDTO);
			allTaskDTO.add(taskDTO);
		}
		return allTaskDTO;
	}

	@Override
	public boolean addTask(TaskDTO taskDTO) {
		// TODO Auto-generated method stub
		Task task = new Task();
		BeanUtils.copyProperties(taskDTO, task);
		taskRepo.save(task);
		return true;
	}

	@Override
	public boolean removeTask(long taskId) {
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		if(optTask.isPresent()) {
			Task task = optTask.get();
			taskRepo.delete(task);
			return true;
		}
		return false;
	}

	@Override
	public TaskDTO updateTask(long taskId, TaskDTO taskDTO) {
		// TODO Auto-generated method stub
		Optional<Task> optTask = taskRepo.findById(taskId);
		if(optTask.isPresent()) {
			Task task = optTask.get();
			BeanUtils.copyProperties(taskDTO, task);
			taskRepo.save(task);
			return taskDTO;
		}
		return null;
	}

}
