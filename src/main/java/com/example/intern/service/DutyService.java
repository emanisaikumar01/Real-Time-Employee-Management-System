package com.example.intern.service;

import com.example.intern.entity.Department;
import com.example.intern.entity.Duty;
import com.example.intern.repository.DepartmentRepository;
import com.example.intern.repository.DutyRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DutyService {
    private final DutyRepository dutyRepository;
    private final DepartmentRepository departmentRepository;

    public DutyService(DutyRepository dutyRepository, DepartmentRepository departmentRepository) {
        this.dutyRepository = dutyRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Duty> getAllDuties() {
        return dutyRepository.findAll();
    }

    public Duty getDutyById(Long id) {
        return findDuty(id);
    }

    public Duty createDuty(Duty duty) {
        attachDepartment(duty);
        return dutyRepository.save(duty);
    }

    public Duty updateDuty(Long id, Duty duty) {
        Duty existing = findDuty(id);
        existing.setTitle(duty.getTitle());
        existing.setDescription(duty.getDescription());
        existing.setDepartment(resolveDepartment(duty.getDepartment()));
        return dutyRepository.save(existing);
    }

    public void deleteDuty(Long id) {
        dutyRepository.delete(findDuty(id));
    }

    private Duty findDuty(Long id) {
        return dutyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Duty not found with id: " + id));
    }

    private void attachDepartment(Duty duty) {
        duty.setDepartment(resolveDepartment(duty.getDepartment()));
    }

    private Department resolveDepartment(Department department) {
        if (department == null || department.getId() == null) {
            return null;
        }
        return departmentRepository.findById(department.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found with id: " + department.getId()));
    }
}
