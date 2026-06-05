package com.example.intern.service;

import com.example.intern.dto.NoticeDTO;
import com.example.intern.entity.Notice;
import com.example.intern.entity.User;
import com.example.intern.repository.NoticeRepository;
import com.example.intern.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Sort;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    public NoticeService(
            NoticeRepository noticeRepository,
            UserRepository userRepository
    ) {
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
    }



    public List<NoticeDTO> getAllNotices() {
        return noticeRepository
                .findAll(
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        )
                )
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public NoticeDTO getNoticeById(Long id) {
        return toDTO(findNotice(id));
    }

    public NoticeDTO createNotice(NoticeDTO dto) {

        Notice notice = new Notice();
        if(dto.getTitle() == null ||
                dto.getTitle().trim().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Title is required"
            );
        }

        if(dto.getDescription() == null ||
                dto.getDescription().trim().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Description is required"
            );
        }
        notice.setTitle(dto.getTitle());
        notice.setDescription(dto.getDescription());
        notice.setCreatedAt(LocalDateTime.now());

        if (dto.getCreatedById() != null) {

            User user =
                    userRepository.findById(
                                    dto.getCreatedById()
                            )
                            .orElseThrow(() ->
                                    new ResponseStatusException(
                                            HttpStatus.NOT_FOUND,
                                            "User not found"
                                    ));

            notice.setCreatedBy(user);
        }

        return toDTO(
                noticeRepository.save(notice)
        );
    }

    public void deleteNotice(Long id) {
        noticeRepository.delete(
                findNotice(id)
        );
    }

    private Notice findNotice(Long id) {

        return noticeRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Notice not found"
                        ));
    }

    private NoticeDTO toDTO(Notice notice) {

        NoticeDTO dto = new NoticeDTO();

        dto.setId(notice.getId());
        dto.setTitle(notice.getTitle());
        dto.setDescription(notice.getDescription());
        dto.setCreatedAt(notice.getCreatedAt());

        if (notice.getCreatedBy() != null) {

            dto.setCreatedById(
                    notice.getCreatedBy().getId()
            );

            dto.setCreatedByName(
                    notice.getCreatedBy().getName()
            );
        }

        return dto;
    }
}