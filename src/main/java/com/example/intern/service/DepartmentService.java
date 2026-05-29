package com.example.intern.service;

import com.example.intern.dto.DepartmentDTO;
import com.example.intern.entity.Department;
import com.example.intern.repository.DepartmentRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream().map(this::toDTO).toList();
    }

    public DepartmentDTO getDepartmentById(Long id) {
        return toDTO(findDepartment(id));
    }

    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        Department department = new Department();
        applyDTO(department, dto);
        return toDTO(departmentRepository.save(department));
    }

    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department department = findDepartment(id);
        applyDTO(department, dto);
        return toDTO(departmentRepository.save(department));
    }

    public void deleteDepartment(Long id) {
        departmentRepository.delete(findDepartment(id));
    }

    public Department findDepartment(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found with id: " + id));
    }

    private void applyDTO(Department department, DepartmentDTO dto) {
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
    }

    private DepartmentDTO toDTO(Department department) {
        return new DepartmentDTO(department.getId(), department.getName(), department.getDescription());
    }
}
