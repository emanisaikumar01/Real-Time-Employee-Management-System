package com.example.intern.controller;

import com.example.intern.entity.Duty;
import com.example.intern.service.DutyService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/duties")
public class DutyController {
    private final DutyService dutyService;

    public DutyController(DutyService dutyService) {
        this.dutyService = dutyService;
    }

    @GetMapping
    public List<Duty> getAllDuties() {
        return dutyService.getAllDuties();
    }

    @GetMapping("/{id}")
    public Duty getDutyById(@PathVariable Long id) {
        return dutyService.getDutyById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Duty createDuty(@RequestBody Duty duty) {
        return dutyService.createDuty(duty);
    }

    @PutMapping("/{id}")
    public Duty updateDuty(@PathVariable Long id, @RequestBody Duty duty) {
        return dutyService.updateDuty(id, duty);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDuty(@PathVariable Long id) {
        dutyService.deleteDuty(id);
    }
}
