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
	public ResponseEntity<TaskDTO> getTask(UUID taskId) {
		return ResponseEntity.status(HttpStatus.OK).body(taskService.getTask(taskId));
	}
	
	@GetMapping("/getAllTask")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<TaskDTO>> getAllTask() {
		return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllTask());
	}
	
	@GetMapping("/getAssignedTask/{userId}")
    @PreAuthorize("hasAuthority('DEVELOPER')")
	public ResponseEntity<List<TaskDTO>> getAssignedTask(@PathVariable UUID userId) {
		return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllTaskByUserId(userId));
	}
	
	@PostMapping("/addTask")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ResponseDTO> addTask(@RequestBody TaskDTO taskDTO) {
		ResponseDTO response = new ResponseDTO();
		response.setMessage(taskService.addTask(taskDTO));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@PutMapping("/updateTask/{taskId}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<TaskDTO> updateTask(@PathVariable UUID taskId, @RequestBody TaskDTO taskDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(taskService.updateTask(taskId, taskDTO));
	}
	
	@DeleteMapping("/removeTask/{taskId}")
    @PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ResponseDTO> removeTask(@PathVariable UUID taskId) {
		ResponseDTO response = new ResponseDTO();
		response.setMessage(taskService.removeTask(taskId));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
