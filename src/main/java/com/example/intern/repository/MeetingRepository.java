package com.example.intern.repository;

import com.example.intern.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository
        extends JpaRepository<Meeting, Long> {
}