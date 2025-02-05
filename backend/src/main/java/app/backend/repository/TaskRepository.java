package app.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.backend.entity.Board;
import app.backend.entity.Task;
import app.backend.entity.UserInfo;
@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
	List<Task> findByAssignedTo(UserInfo assignedTo);
	List<Task> findByAssignorId(UUID assignorId);
	List<Task> findByBoard(Board board);
}
