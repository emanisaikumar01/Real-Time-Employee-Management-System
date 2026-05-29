package com.example.intern.repository;

import com.example.intern.entity.RoleDuty;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDutyRepository extends JpaRepository<RoleDuty, Long> {
    List<RoleDuty> findByRoleId(Long roleId);
}
