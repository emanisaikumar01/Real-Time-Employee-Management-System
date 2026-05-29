package com.example.intern.service;

import com.example.intern.dto.LeaveRequestDTO;
import com.example.intern.entity.LeaveRequest;
import com.example.intern.entity.User;
import com.example.intern.enums.LeaveStatus;
import com.example.intern.repository.LeaveRequestRepository;
import com.example.intern.repository.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LeaveRequestService {
    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, UserRepository userRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.userRepository = userRepository;
    }

    public List<LeaveRequestDTO> getAllLeaveRequests() {
        return leaveRequestRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<LeaveRequestDTO> getLeaveRequestsByUser(Long userId) {
        return leaveRequestRepository.findByUserId(userId).stream().map(this::toDTO).toList();
    }

    public LeaveRequestDTO getLeaveRequestById(Long id) {
        return toDTO(findLeaveRequest(id));
    }

    public LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto) {
        LeaveRequest leaveRequest = new LeaveRequest();
        applyDTO(leaveRequest, dto);
        return toDTO(leaveRequestRepository.save(leaveRequest));
    }

    public LeaveRequestDTO updateLeaveRequest(Long id, LeaveRequestDTO dto) {
        LeaveRequest leaveRequest = findLeaveRequest(id);
        applyDTO(leaveRequest, dto);
        return toDTO(leaveRequestRepository.save(leaveRequest));
    }

    public LeaveRequestDTO updateStatus(Long id, LeaveStatus status) {
        LeaveRequest leaveRequest = findLeaveRequest(id);
        leaveRequest.setStatus(status);
        return toDTO(leaveRequestRepository.save(leaveRequest));
    }

    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.delete(findLeaveRequest(id));
    }

    private LeaveRequest findLeaveRequest(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Leave request not found with id: " + id));
    }

    private void applyDTO(LeaveRequest leaveRequest, LeaveRequestDTO dto) {
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());
        leaveRequest.setStatus(dto.getStatus() == null ? LeaveStatus.PENDING : dto.getStatus());
        leaveRequest.setUser(findUser(dto.getUserId()));
    }

    private User findUser(Long id) {
        if (id == null) {
            return null;
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id));
    }

    private LeaveRequestDTO toDTO(LeaveRequest leaveRequest) {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setId(leaveRequest.getId());
        dto.setStartDate(leaveRequest.getStartDate());
        dto.setEndDate(leaveRequest.getEndDate());
        dto.setReason(leaveRequest.getReason());
        dto.setStatus(leaveRequest.getStatus());
        if (leaveRequest.getUser() != null) {
            dto.setUserId(leaveRequest.getUser().getId());
            dto.setUserName(leaveRequest.getUser().getName());
        }
        return dto;
    }
}
