package com.example.intern.service;

import com.example.intern.dto.TaskDTO;
import com.example.intern.entity.Task;
import com.example.intern.entity.User;
import com.example.intern.enums.TaskStatus;
import com.example.intern.exception.TaskNotFoundException;
import com.example.intern.repository.TaskRepository;
import com.example.intern.repository.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<TaskDTO> getTasksByAssignedUser(Long userId) {
        return taskRepository.findByAssignedToId(userId).stream().map(this::toDTO).toList();
    }

    public List<TaskDTO> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).stream().map(this::toDTO).toList();
    }

    public TaskDTO getTaskById(Long id) {
        return toDTO(findTask(id));
    }

    public TaskDTO createTask(TaskDTO dto) {
        Task task = new Task();
        applyDTO(task, dto);
        return toDTO(taskRepository.save(task));
    }

    public TaskDTO updateTask(Long id, TaskDTO dto) {
        Task task = findTask(id);
        applyDTO(task, dto);
        return toDTO(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        taskRepository.delete(findTask(id));
    }

    private Task findTask(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    private void applyDTO(Task task, TaskDTO dto) {
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus() == null ? TaskStatus.PENDING : dto.getStatus());
        task.setDueDate(dto.getDueDate());
        task.setAssignedTo(findUser(dto.getAssignedToId()));
        task.setCreatedBy(findUser(dto.getCreatedById()));
    }

    private User findUser(Long id) {
        if (id == null) {
            return null;
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id));
    }

    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        if (task.getAssignedTo() != null) {
            dto.setAssignedToId(task.getAssignedTo().getId());
            dto.setAssignedToName(task.getAssignedTo().getName());
        }
        if (task.getCreatedBy() != null) {
            dto.setCreatedById(task.getCreatedBy().getId());
            dto.setCreatedByName(task.getCreatedBy().getName());
        }
        return dto;
    }
}
