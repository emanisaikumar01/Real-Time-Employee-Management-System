package com.example.intern.controller;

import com.example.intern.repository.DepartmentRepository;
import com.example.intern.repository.LeaveRequestRepository;
import com.example.intern.repository.TaskRepository;
import com.example.intern.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final DepartmentRepository departmentRepository;
    private final LeaveRequestRepository leaveRequestRepository;

    public DashboardController(
            UserRepository userRepository,
            TaskRepository taskRepository,
            DepartmentRepository departmentRepository,
            LeaveRequestRepository leaveRequestRepository) {

        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.departmentRepository = departmentRepository;
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @GetMapping
    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        data.put("users", userRepository.count());
        data.put("departments", departmentRepository.count());
        data.put("tasks", taskRepository.count());
        data.put("leaveRequests", leaveRequestRepository.count());

        return data;
    }

    @GetMapping("/employee/{userId}")
    public Map<String, Object> getEmployeeDashboard(
            @PathVariable Long userId) {

        Map<String, Object> data = new HashMap<>();

        data.put(
                "myTasks",
                taskRepository.findByAssignedToId(userId).size()
        );

        data.put(
                "myLeaves",
                0
        );

        return data;
    }
}