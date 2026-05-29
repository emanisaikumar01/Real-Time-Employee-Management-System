package com.example.intern.controller;

import com.example.intern.dto.ReportDTO;
import com.example.intern.service.ReportService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportDTO> getReports(@RequestParam(required = false) Long employeeId) {
        if (employeeId != null) {
            return reportService.getReportsByEmployee(employeeId);
        }
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public ReportDTO getReportById(@PathVariable Long id) {
        return reportService.getReportById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportDTO createReport(@RequestBody ReportDTO reportDTO) {
        return reportService.createReport(reportDTO);
    }

    @PutMapping("/{id}")
    public ReportDTO updateReport(@PathVariable Long id, @RequestBody ReportDTO reportDTO) {
        return reportService.updateReport(id, reportDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
    }
}
