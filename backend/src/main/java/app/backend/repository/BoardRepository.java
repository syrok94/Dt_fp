package app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.backend.entity.Board;
@Repository
public interface BoardRepository extends JpaRepository<Board, UUID>{

}
