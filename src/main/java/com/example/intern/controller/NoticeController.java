package com.example.intern.controller;

import com.example.intern.dto.NoticeDTO;
import com.example.intern.service.NoticeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(
            NoticeService noticeService
    ) {
        this.noticeService = noticeService;
    }

    @GetMapping
    public List<NoticeDTO> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public NoticeDTO getNoticeById(
            @PathVariable Long id
    ) {
        return noticeService.getNoticeById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoticeDTO createNotice(
            @RequestBody NoticeDTO dto
    ) {
        return noticeService.createNotice(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNotice(
            @PathVariable Long id
    ) {
        noticeService.deleteNotice(id);
    }
}