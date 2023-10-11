package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.HistoryRecordDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.HistoryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/history-records/secure")
public class HistoryRecordController {

    private final HistoryRecordService historyRecordService;
    private final JwtUtils jwtUtils;

    @Autowired
    public HistoryRecordController(HistoryRecordService historyRecordService, JwtUtils jwtUtils) {
        this.historyRecordService = historyRecordService;
        this.jwtUtils = jwtUtils;
    }

    private String extractEmail(String token) {
        String jwt = token.substring(7);
        return jwtUtils.extractPersonEmail(jwt);
    }

    @GetMapping
    public Page<HistoryRecordDTO> findAllByPersonEmail(@RequestHeader("Authorization") String token,
                                                       @RequestParam(value = "page", required = true) Integer page,
                                                       @RequestParam(value = "records-per-page", required = true) Integer recordsPerPage) {

        return historyRecordService.findAllByPersonEmail(extractEmail(token), PageRequest.of(page, recordsPerPage));
    }
}
