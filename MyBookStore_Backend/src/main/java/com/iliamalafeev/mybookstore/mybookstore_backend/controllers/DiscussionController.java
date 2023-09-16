package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.DiscussionService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.DiscussionErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.DiscussionException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions/secure")
public class DiscussionController {

    private final JwtUtils jwtUtils;
    private final DiscussionService discussionService;

    @Autowired
    public DiscussionController(JwtUtils jwtUtils, DiscussionService discussionService) {
        this.jwtUtils = jwtUtils;
        this.discussionService = discussionService;
    }

    private String extractEmail(String token) {
        String jwt = token.substring(7);
        return jwtUtils.extractPersonEmail(jwt);
    }

    @GetMapping
    public List<DiscussionDTO> findAllByPersonEmail(@RequestHeader("Authorization") String token) {

        return discussionService.findAllByPersonEmail(extractEmail(token));
    }

    @PostMapping("add-discussion")
    public ResponseEntity<HttpStatus> addDiscussion(@RequestHeader("Authorization") String token,
                                                    @RequestBody @Valid DiscussionDTO discussionDTO, BindingResult bindingResult) {
        discussionService.addDiscussion(extractEmail(token), discussionDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<DiscussionErrorResponse> handleException(DiscussionException e) {
        DiscussionErrorResponse response = new DiscussionErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
