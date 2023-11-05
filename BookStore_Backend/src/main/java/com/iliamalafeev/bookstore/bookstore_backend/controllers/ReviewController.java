package com.iliamalafeev.bookstore.bookstore_backend.controllers;

import com.iliamalafeev.bookstore.bookstore_backend.dto.ReviewDTO;
import com.iliamalafeev.bookstore.bookstore_backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public Page<ReviewDTO> findAllByBookId(@PathVariable("bookId") Long bookId, @RequestParam(value = "page") Integer page,
                                           @RequestParam(value = "reviews-per-page") Integer reviewsPerPage,
                                           @RequestParam(value = "latest", defaultValue = "false") boolean latest) {

        return reviewService.findAllByBookId(bookId, PageRequest.of(page, reviewsPerPage), latest);
    }

    @GetMapping("/average-rating/{bookId}")
    public Double getAverageRatingByBookId(@PathVariable("bookId") Long bookId) {

        return reviewService.getAverageRatingByBookId(bookId);
    }
}
