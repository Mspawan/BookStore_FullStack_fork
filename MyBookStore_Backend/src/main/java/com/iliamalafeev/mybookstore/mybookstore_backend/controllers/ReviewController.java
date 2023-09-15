package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Review;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.ReviewService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.BookErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{bookId}")
    public List<Review> findAllByBookId(@PathVariable("bookId") Long bookId) {

        return reviewService.findAllByBookId(bookId);
    }

    @ExceptionHandler
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
