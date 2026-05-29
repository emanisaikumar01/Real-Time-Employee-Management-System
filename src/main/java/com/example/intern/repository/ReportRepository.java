package com.example.intern.repository;

import com.example.intern.entity.Report;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByEmployeeId(Long employeeId);
}
