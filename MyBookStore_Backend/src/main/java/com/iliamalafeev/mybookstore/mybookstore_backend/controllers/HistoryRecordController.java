package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.HistoryRecordDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.HistoryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<HistoryRecordDTO> findAllByPersonEmail(@RequestHeader("Authorization") String token) {

        return historyRecordService.findAllByPersonEmail(extractEmail(token));
    }
}
