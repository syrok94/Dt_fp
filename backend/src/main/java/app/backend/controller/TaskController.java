package app.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.backend.dto.TaskDTO;
import app.backend.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@GetMapping("/getTask/taskId")
	public TaskDTO getTask(long taskId) {
		return taskService.getTask(taskId);
	}
	
	@GetMapping("/getAllTask")
	public List<TaskDTO> getAllTask() {
		return taskService.getAllTask();
	}
	
	@PostMapping("/addTask")
	public boolean addTask(@RequestBody TaskDTO taskDTO) {
		return taskService.addTask(taskDTO);
	}
	
	@PutMapping("/updateTask/taskId")
	public TaskDTO updateTask(@PathVariable long taskId, @RequestBody TaskDTO taskDTO) {
		return taskService.updateTask(taskId, taskDTO);
	}
	
	@DeleteMapping("/removeTask/taskId")
	public boolean removeTask(@PathVariable long taskId) {
		return taskService.removeTask(taskId);
	}
}
