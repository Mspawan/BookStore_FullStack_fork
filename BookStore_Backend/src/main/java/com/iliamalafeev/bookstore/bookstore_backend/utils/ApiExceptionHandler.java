package com.iliamalafeev.bookstore.bookstore_backend.utils;

import com.iliamalafeev.bookstore.bookstore_backend.utils.error_responses.*;
import com.iliamalafeev.bookstore.bookstore_backend.utils.exceptions.*;
import com.stripe.exception.StripeException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ExpiredJwtErrorResponse> handleExpiredJwtException() {
        ExpiredJwtErrorResponse response = new ExpiredJwtErrorResponse("Your authentication token is expired, please re-login.", System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<SignatureErrorResponse> handleSignatureException() {
        SignatureErrorResponse response = new SignatureErrorResponse("Your authentication token is invalid or it's signature cannot be trusted, please re-login.", System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BookException.class)
    private ResponseEntity<BookErrorResponse> handleException(BookException e) {
        BookErrorResponse response = new BookErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DiscussionException.class)
    private ResponseEntity<DiscussionErrorResponse> handleException(DiscussionException e) {
        DiscussionErrorResponse response = new DiscussionErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ReviewException.class)
    private ResponseEntity<ReviewErrorResponse> handleException(ReviewException e) {
        ReviewErrorResponse response = new ReviewErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentException.class)
    private ResponseEntity<PaymentErrorResponse> handleException(PaymentException e) {
        PaymentErrorResponse response = new PaymentErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PersonException.class)
    private ResponseEntity<PersonErrorResponse> handleException(PersonException e) {
        PersonErrorResponse response = new PersonErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(StripeException.class)
    private ResponseEntity<PaymentErrorResponse> handleException(StripeException e) {
        PaymentErrorResponse response = new PaymentErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
