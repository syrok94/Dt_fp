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

import app.backend.dto.BoardDTO;
import app.backend.dto.ResponseDTO;
import app.backend.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {

	@Autowired
	BoardService boardService;
	
	@GetMapping("/getBoard/{boardId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<BoardDTO> getBoard(@PathVariable UUID boardId) {
		return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoard(boardId));
	}
	
	@GetMapping("/getAllBoard/{userId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<BoardDTO>> getAllBoard(@PathVariable UUID userId) {
		return ResponseEntity.status(HttpStatus.OK).body(boardService.getAllBoard(userId));
	}
	
	@PostMapping("/addBoard")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<BoardDTO> addBoard(@RequestBody BoardDTO boardDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(boardService.addBoard(boardDTO));
	}
	
	@DeleteMapping("/removeBoard/{boardId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ResponseDTO> removeBoard(@PathVariable UUID boardId) {
		ResponseDTO response = new ResponseDTO();
		response.setMessage(boardService.removeBoard(boardId));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@PutMapping("/updateBoard/{boardId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<BoardDTO>  updateBoard(@PathVariable UUID boardId, @RequestBody BoardDTO boardDTO){
		return ResponseEntity.status(HttpStatus.OK).body(boardService.updateBoard(boardId, boardDTO));
	}
}
