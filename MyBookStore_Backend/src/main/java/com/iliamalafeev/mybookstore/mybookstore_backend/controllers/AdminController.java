package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.BookDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.BookService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.BookErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/secure")
public class AdminController {

    private final BookService bookService;

    @Autowired
    public AdminController(BookService bookService) {
        this.bookService = bookService;
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

    @ExceptionHandler
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
