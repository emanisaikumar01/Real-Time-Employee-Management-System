package com.example.intern.controller;

import com.example.intern.dto.LeaveRequestDTO;
import com.example.intern.enums.LeaveStatus;
import com.example.intern.service.LeaveRequestService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {
    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping
    public List<LeaveRequestDTO> getLeaveRequests(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return leaveRequestService.getLeaveRequestsByUser(userId);
        }
        return leaveRequestService.getAllLeaveRequests();
    }

    @GetMapping("/{id}")
    public LeaveRequestDTO getLeaveRequestById(@PathVariable Long id) {
        return leaveRequestService.getLeaveRequestById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeaveRequestDTO createLeaveRequest(@RequestBody LeaveRequestDTO leaveRequestDTO) {
        return leaveRequestService.createLeaveRequest(leaveRequestDTO);
    }

    @PutMapping("/{id}")
    public LeaveRequestDTO updateLeaveRequest(@PathVariable Long id, @RequestBody LeaveRequestDTO leaveRequestDTO) {
        return leaveRequestService.updateLeaveRequest(id, leaveRequestDTO);
    }

    @PatchMapping("/{id}/status")
    public LeaveRequestDTO updateStatus(@PathVariable Long id, @RequestParam LeaveStatus status) {
        return leaveRequestService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestService.deleteLeaveRequest(id);
    }
}
