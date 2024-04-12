package com.iliamalafeev.bookstore.bookstore_backend.controllers;

import com.iliamalafeev.bookstore.bookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.bookstore.bookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.bookstore.bookstore_backend.services.DiscussionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/discussions/secure")
@SecurityRequirement(name = "Bearer Authentication")
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
    public Page<DiscussionDTO> findAllByPersonEmail(@RequestHeader("Authorization") String token, @RequestParam(value = "page") Integer page,
                                                    @RequestParam(value = "discussions-per-page") Integer discussionsPerPage) {

        return discussionService.findAllByPersonEmail(extractEmail(token), PageRequest.of(page, discussionsPerPage));
    }

    @PostMapping("add-discussion")
    public ResponseEntity<HttpStatus> addDiscussion(@RequestHeader("Authorization") String token,
                                                    @RequestBody @Valid DiscussionDTO discussionDTO, BindingResult bindingResult) {
        discussionService.addDiscussion(extractEmail(token), discussionDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
