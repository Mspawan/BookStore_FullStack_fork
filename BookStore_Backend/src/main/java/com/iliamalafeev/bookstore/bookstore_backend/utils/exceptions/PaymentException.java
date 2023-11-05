package com.iliamalafeev.bookstore.bookstore_backend.utils.exceptions;

public class PaymentException extends RuntimeException {

    public PaymentException(String message) {
        super(message);
    }
}
