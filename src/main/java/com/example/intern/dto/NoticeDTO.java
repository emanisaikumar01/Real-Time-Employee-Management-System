package com.example.intern.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class NoticeDTO {

    private Long id;

    private String title;

    private String description;

    private Long createdById;

    private String createdByName;

    private LocalDateTime createdAt;

    public NoticeDTO() {
    }

}