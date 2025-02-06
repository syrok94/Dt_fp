package app.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import app.backend.entity.Comment;
import app.backend.entity.Task;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
	List<Comment> findByTask(Task task);
}
