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

import app.backend.dto.BoardDTO;
import app.backend.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {

	@Autowired
	BoardService boardService;
	
	@GetMapping("/getBoard/boardId")
	public BoardDTO getBoard(@PathVariable long boardId) {
		return boardService.getBoard(boardId);
	}
	
	@GetMapping("/getAllBoard")
	public List<BoardDTO> getAllBoard() {
		return boardService.getAllBoard();
	}
	
	@PostMapping("/addBoard")
	public boolean addBoard(@RequestBody BoardDTO boardDTO) {
		return boardService.addBoard(boardDTO);
	}
	
	@DeleteMapping("/removeBoard/boardId")
	public boolean removeBoard(@PathVariable long boardId) {
		return boardService.removeBoard(boardId);
	}
	
	@PutMapping("/updateBoard/boardId")
	public BoardDTO updateBoard(@PathVariable long boardId, @RequestBody BoardDTO boardDTO){
		return boardService.updateBoard(boardId, boardDTO);
	}
}
