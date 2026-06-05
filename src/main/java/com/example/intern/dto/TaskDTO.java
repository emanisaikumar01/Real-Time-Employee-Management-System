package com.example.intern.dto;

import com.example.intern.enums.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDate dueDate;

    private Long assignedToId;
    private String assignedToName;

    private Long assignedById;
    private String assignedByName;

    public TaskDTO() {
    }

}