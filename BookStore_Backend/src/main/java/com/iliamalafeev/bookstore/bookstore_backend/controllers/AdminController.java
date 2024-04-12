package com.iliamalafeev.bookstore.bookstore_backend.controllers;

import com.iliamalafeev.bookstore.bookstore_backend.dto.BookDTO;
import com.iliamalafeev.bookstore.bookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.bookstore.bookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.bookstore.bookstore_backend.services.BookService;
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
@RequestMapping("/api/admin/secure")
@SecurityRequirement(name = "Bearer Authentication")
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
    public Page<DiscussionDTO> findAllUnclosedDiscussions(@RequestParam(value = "page") Integer page,
                                                          @RequestParam(value = "discussions-per-page") Integer discussionsPerPage) {

        return discussionService.findAllByClosed(PageRequest.of(page, discussionsPerPage));
    }

    @PostMapping("/close-discussion")
    public ResponseEntity<HttpStatus> updateDiscussion(@RequestHeader("Authorization") String token,
                                                       @RequestBody @Valid DiscussionDTO discussionDTO, BindingResult bindingResult) {
        discussionService.updateDiscussion(extractEmail(token), discussionDTO, bindingResult);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
