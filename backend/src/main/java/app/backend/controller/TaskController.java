package app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.backend.dto.ResponseDTO;
import app.backend.dto.TaskDTO;
import app.backend.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@GetMapping("/getTask/{taskId}")
    @PreAuthorize("hasAnyAuthority('DEVELOPER', 'ADMIN')")
	public ResponseEntity<TaskDTO> getTask(@PathVariable UUID taskId) {
		TaskDTO task = taskService.getTask(taskId);
		if(task!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(task);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/getAllTask/{assignorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<TaskDTO>> getAllTask(@PathVariable UUID assignorId) {
		List<TaskDTO> tasks = taskService.getAllTask(assignorId);
		if(tasks!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(tasks);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/getAllBoardTask/{boardId}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<TaskDTO>> getAllBoardTask(@PathVariable UUID boardId) {
		List<TaskDTO> tasks = taskService.getAllBoardTask(boardId);
		if(tasks!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(tasks);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/getAssignedTask/{userId}")
    @PreAuthorize("hasAuthority('DEVELOPER')")
	public ResponseEntity<List<TaskDTO>> getAssignedTask(@PathVariable UUID userId) {
		List<TaskDTO> tasks = taskService.getAllTaskByUserId(userId);
		if(tasks!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(tasks);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("/addTask")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<TaskDTO> addTask(@RequestBody TaskDTO taskDTO) {
		TaskDTO task = taskService.addTask(taskDTO);
		if(task!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(task);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PutMapping("/updateTask/{taskId}")
    @PreAuthorize("hasAnyAuthority('DEVELOPER', 'ADMIN')")
	public ResponseEntity<TaskDTO> updateTask(@PathVariable UUID taskId, @RequestBody TaskDTO taskDTO) {
		TaskDTO task = taskService.updateTask(taskId, taskDTO);
		if(task!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(task);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@DeleteMapping("/removeTask/{taskId}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ResponseDTO> removeTask(@PathVariable UUID taskId) {
		ResponseDTO response = new ResponseDTO();
		response.setMessage("Task removal failure");
		if(taskService.removeTask(taskId)) {
			response.setMessage("Task removed sucessfully");
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
