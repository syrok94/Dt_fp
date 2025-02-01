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

import app.backend.dto.CommentDTO;
import app.backend.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	CommentService commentService;
	
	@GetMapping("/getComment/{commentId}")
	public CommentDTO getComment(@PathVariable long commentId) {
		return commentService.getComment(commentId);
	}
	
	@GetMapping("/getAllComment")
	public List<CommentDTO> getAllComment() {
		return commentService.getAllComment();
	}
	
	@PostMapping("/addComment")
	public boolean addComment(@RequestBody CommentDTO commentDTO) {
		return commentService.addComment(commentDTO);
	}
	
	@PutMapping("/updateComment/{commentId}") 
	public CommentDTO updateComment(@PathVariable long commentId, @RequestBody CommentDTO commentDTO){
		return commentService.updateComment(commentId, commentDTO);
	}
	
	@DeleteMapping("/removeComment/{commentId}")
	public boolean removeComment(@PathVariable long id, @RequestBody CommentDTO commentDTO) {
		return commentService.removeComment(id);
	}
}
