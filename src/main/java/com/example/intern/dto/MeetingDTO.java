package com.example.intern.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
public class MeetingDTO {

    private Long id;

    private String title;

    private String agenda;

    private LocalDate meetingDate;

    private LocalTime meetingTime;

    private Long createdById;

    private String createdByName;

    public MeetingDTO() {
    }

}