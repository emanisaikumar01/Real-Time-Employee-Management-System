package com.example.intern.repository;

import com.example.intern.entity.Task;
import com.example.intern.enums.TaskStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToId(Long assignedToId);

    List<Task> findByStatus(TaskStatus status);
}
