package com.example.intern.service;

import com.example.intern.dto.MeetingDTO;
import com.example.intern.entity.Meeting;
import com.example.intern.entity.User;
import com.example.intern.repository.MeetingRepository;
import com.example.intern.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

    public MeetingService(
            MeetingRepository meetingRepository,
            UserRepository userRepository
    ) {
        this.meetingRepository = meetingRepository;
        this.userRepository = userRepository;
    }

    public List<MeetingDTO> getAllMeetings() {

        return meetingRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public MeetingDTO createMeeting(
            MeetingDTO dto
    ) {

        Meeting meeting =
                new Meeting();

        meeting.setTitle(
                dto.getTitle()
        );

        meeting.setAgenda(
                dto.getAgenda()
        );

        meeting.setMeetingDate(
                dto.getMeetingDate()
        );

        meeting.setMeetingTime(
                dto.getMeetingTime()
        );

        if (dto.getCreatedById()
                != null) {

            User user =
                    userRepository
                            .findById(
                                    dto.getCreatedById()
                            )
                            .orElseThrow(() ->
                                    new ResponseStatusException(
                                            HttpStatus.NOT_FOUND,
                                            "User not found"
                                    ));

            meeting.setCreatedBy(
                    user
            );
        }

        return toDTO(
                meetingRepository.save(
                        meeting
                )
        );
    }

    public void deleteMeeting(
            Long id
    ) {

        meetingRepository.deleteById(
                id
        );
    }

    private MeetingDTO toDTO(
            Meeting meeting
    ) {

        MeetingDTO dto =
                new MeetingDTO();

        dto.setId(
                meeting.getId()
        );

        dto.setTitle(
                meeting.getTitle()
        );

        dto.setAgenda(
                meeting.getAgenda()
        );

        dto.setMeetingDate(
                meeting.getMeetingDate()
        );

        dto.setMeetingTime(
                meeting.getMeetingTime()
        );

        if (
                meeting.getCreatedBy()
                        != null
        ) {

            dto.setCreatedById(
                    meeting.getCreatedBy()
                            .getId()
            );

            dto.setCreatedByName(
                    meeting.getCreatedBy()
                            .getName()
            );
        }

        return dto;
    }
}