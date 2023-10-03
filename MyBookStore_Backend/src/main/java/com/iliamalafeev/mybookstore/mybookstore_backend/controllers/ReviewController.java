package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.ReviewDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.ReviewService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.BookErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{bookId}")
    public Page<ReviewDTO> findAllByBookId(@PathVariable("bookId") Long bookId,
                                           @RequestParam(value = "page", required = true) Integer page,
                                           @RequestParam(value = "reviews-per-page", required = true) Integer reviewsPerPage) {

        return reviewService.findAllByBookId(bookId, PageRequest.of(page, reviewsPerPage));
    }

    @ExceptionHandler
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
