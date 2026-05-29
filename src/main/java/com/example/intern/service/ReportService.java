package com.example.intern.service;

import com.example.intern.dto.ReportDTO;
import com.example.intern.entity.Report;
import com.example.intern.entity.User;
import com.example.intern.exception.ReportNotFoundException;
import com.example.intern.repository.ReportRepository;
import com.example.intern.repository.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<ReportDTO> getReportsByEmployee(Long employeeId) {
        return reportRepository.findByEmployeeId(employeeId).stream().map(this::toDTO).toList();
    }

    public ReportDTO getReportById(Long id) {
        return toDTO(findReport(id));
    }

    public ReportDTO createReport(ReportDTO dto) {
        Report report = new Report();
        applyDTO(report, dto);
        return toDTO(reportRepository.save(report));
    }

    public ReportDTO updateReport(Long id, ReportDTO dto) {
        Report report = findReport(id);
        applyDTO(report, dto);
        return toDTO(reportRepository.save(report));
    }

    public void deleteReport(Long id) {
        reportRepository.delete(findReport(id));
    }

    private Report findReport(Long id) {
        return reportRepository.findById(id).orElseThrow(() -> new ReportNotFoundException(id));
    }

    private void applyDTO(Report report, ReportDTO dto) {
        report.setTitle(dto.getTitle());
        report.setContent(dto.getContent());
        report.setCreatedAt(dto.getCreatedAt());
        report.setEmployee(findUser(dto.getEmployeeId()));
    }

    private User findUser(Long id) {
        if (id == null) {
            return null;
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id));
    }

    private ReportDTO toDTO(Report report) {
        ReportDTO dto = new ReportDTO();
        dto.setId(report.getId());
        dto.setTitle(report.getTitle());
        dto.setContent(report.getContent());
        dto.setCreatedAt(report.getCreatedAt());
        if (report.getEmployee() != null) {
            dto.setEmployeeId(report.getEmployee().getId());
            dto.setEmployeeName(report.getEmployee().getName());
        }
        return dto;
    }
}
