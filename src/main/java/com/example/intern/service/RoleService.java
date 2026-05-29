package com.example.intern.service;

import com.example.intern.entity.Role;
import com.example.intern.repository.RoleRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id) {
        return findRole(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Long id, Role role) {
        Role existing = findRole(id);
        existing.setRoleType(role.getRoleType());
        existing.setRoleName(role.getRoleName());
        return roleRepository.save(existing);
    }

    public void deleteRole(Long id) {
        roleRepository.delete(findRole(id));
    }

    public Role findRole(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id: " + id));
    }
}
