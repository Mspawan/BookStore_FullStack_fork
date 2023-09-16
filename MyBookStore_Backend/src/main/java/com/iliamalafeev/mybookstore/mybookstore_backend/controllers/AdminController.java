package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.BookDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.BookService;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.DiscussionService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.BookErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.DiscussionErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.DiscussionException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/secure")
public class AdminController {

    private final BookService bookService;
    private final DiscussionService discussionService;
    private final JwtUtils jwtUtils;

    @Autowired
    public AdminController(BookService bookService, DiscussionService discussionService, JwtUtils jwtUtils) {
        this.bookService = bookService;
        this.discussionService = discussionService;
        this.jwtUtils = jwtUtils;
    }

    private String extractEmail(String token) {
        String jwt = token.substring(7);
        return jwtUtils.extractPersonEmail(jwt);
    }

    @PostMapping("/add-book")
    public ResponseEntity<HttpStatus> postBook(@RequestBody @Valid BookDTO bookDTO, BindingResult bindingResult) {

        bookService.addBook(bookDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/increase-quantity/{bookId}")
    public ResponseEntity<HttpStatus> increaseBookQuantity(@PathVariable("bookId") Long bookId) {

        bookService.changeQuantity(bookId, "increase");
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/decrease-quantity/{bookId}")
    public ResponseEntity<HttpStatus> decreaseBookQuantity(@PathVariable("bookId") Long bookId) {

        bookService.changeQuantity(bookId, "decrease");
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete-book/{bookId}")
    public ResponseEntity<HttpStatus> deleteBook(@PathVariable("bookId") Long bookId) {

        bookService.deleteById(bookId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/open-discussions")
    public List<DiscussionDTO> findAllUnclosedDiscussions() {

        return discussionService.findAllByClosed(false);
    }

    @PostMapping("/close-discussion")
    public ResponseEntity<HttpStatus> updateDiscussion(@RequestHeader("Authorization") String token,
                                                       @RequestBody @Valid DiscussionDTO discussionDTO, BindingResult bindingResult) {
        discussionService.updateDiscussion(extractEmail(token), discussionDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<DiscussionErrorResponse> handleException(DiscussionException e) {
        DiscussionErrorResponse response = new DiscussionErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
