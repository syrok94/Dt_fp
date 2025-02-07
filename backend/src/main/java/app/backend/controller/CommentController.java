package app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.backend.dto.CommentDTO;
import app.backend.dto.ResponseDTO;
import app.backend.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	CommentService commentService;
	
	@GetMapping("/getComment/{commentId}")
	public ResponseEntity<CommentDTO> getComment(@PathVariable UUID commentId) {
		CommentDTO comment = commentService.getComment(commentId);
		if(comment!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(comment);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/getAllComment/{taskId}")
	public ResponseEntity<List<CommentDTO>> getAllComment(@PathVariable UUID taskId) {
		List<CommentDTO> allComment = commentService.getAllComment(taskId);
		if(allComment!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(allComment);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("/addComment")
	public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO) {
		CommentDTO comment = commentService.addComment(commentDTO);
		if(comment!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(comment);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@DeleteMapping("/removeComment/{commentId}")
	public ResponseEntity<ResponseDTO> removeComment(@PathVariable UUID commentId) {
		ResponseDTO response = new ResponseDTO();
		response.setMessage("Comment deletion failed");
		if(commentService.removeComment(commentId)) {
			response.setMessage("Comment deleted successfully");
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
