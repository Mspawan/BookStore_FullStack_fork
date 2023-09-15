package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.BookDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.dto.ReviewDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.BookService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.BookErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.PaymentErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.ReviewErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.PaymentException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.ReviewException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final JwtUtils jwtUtils;

    @Autowired
    public BookController(BookService bookService, JwtUtils jwtUtils) {
        this.bookService = bookService;
        this.jwtUtils = jwtUtils;
    }

    private String extractEmail(String token) {
        String jwt = token.substring(7);
        return jwtUtils.extractPersonEmail(jwt);
    }

    @GetMapping
    public List<BookDTO> findAll() {

        return bookService.findAll();
    }

    @GetMapping("/{bookId}")
    public BookDTO findById(@PathVariable("bookId") Long bookId) {

        return bookService.findById(bookId);
    }

    @GetMapping("/search/by-title")
    public List<BookDTO> findAllByTitle(@RequestParam("title-query") String titleQuery) {

        return bookService.findAllByTitle(titleQuery);
    }

    @GetMapping("/search/by-genre")
    public List<BookDTO> findAllByGenre(@RequestParam("genre-query") String genreQuery) {

        return bookService.findAllByGenre(genreQuery);
    }

    @GetMapping("/secure/is-checked-out/{bookId}")
    public Boolean isBookCheckedOutByPerson(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token) {

        return bookService.isBookCheckedOutByPerson(extractEmail(token), bookId);
    }

    @PutMapping("/secure/checkout/{bookId}")
    public ResponseEntity<HttpStatus> checkoutBook(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token) {

        bookService.checkoutBook(extractEmail(token), bookId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/secure/renew-checkout/{bookId}")
    public ResponseEntity<HttpStatus> renewCheckout(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token) {

        bookService.renewCheckout(extractEmail(token), bookId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/secure/return/{bookId}")
    public ResponseEntity<HttpStatus> returnBook(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token) {

        bookService.returnBook(extractEmail(token), bookId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/secure/is-reviewed/{bookId}")
    public Boolean isBookReviewedByPerson(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token) {

        return bookService.isBookReviewedByPerson(extractEmail(token), bookId);
    }

    @PostMapping("/secure/review/{bookId}")
    public ResponseEntity<HttpStatus> reviewBook(@PathVariable("bookId") Long bookId, @RequestHeader("Authorization") String token,
                                                 @RequestBody @Valid ReviewDTO reviewDTO, BindingResult bindingResult) {
        bookService.reviewBook(extractEmail(token), bookId, reviewDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ReviewErrorResponse> handleException(ReviewException e) {
        ReviewErrorResponse response = new ReviewErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<PaymentErrorResponse> handleException(PaymentException e) {
        PaymentErrorResponse response = new PaymentErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
