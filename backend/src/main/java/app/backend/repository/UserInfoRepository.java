package app.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.backend.entity.UserInfo;
import app.backend.enums.RoleEnum;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, UUID> {
    Optional<UserInfo> findByEmail(String email); // Use 'email' if that is the correct field for login
    List<UserInfo> findAllByRole(RoleEnum role);
}
