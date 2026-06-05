package com.example.intern.controller;

import com.example.intern.dto.MeetingDTO;
import com.example.intern.service.MeetingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins ={"http://localhost:5173", "http://localhost:3000"})
public class MeetingController {

    private final MeetingService
            meetingService;

    public MeetingController(
            MeetingService meetingService
    ) {
        this.meetingService =
                meetingService;
    }

    @GetMapping
    public List<MeetingDTO>
    getAllMeetings() {

        return meetingService
                .getAllMeetings();
    }

    @PostMapping
    public MeetingDTO
    createMeeting(
            @RequestBody
            MeetingDTO dto
    ) {

        return meetingService
                .createMeeting(
                        dto
                );
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(
            @PathVariable Long id
    ) {

        meetingService
                .deleteMeeting(id);
    }
}