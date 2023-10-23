package com.iliamalafeev.mybookstore.mybookstore_backend.utils;

import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

public class ErrorsUtil {

    public static void returnBookError(String generalMessage, BindingResult bindingResult) {

        throw new BookException(buildErrorMessage(generalMessage, bindingResult));
    }

    public static void returnPersonError(String generalMessage, BindingResult bindingResult) {

        throw new PersonException(buildErrorMessage(generalMessage, bindingResult));
    }

    public static void returnReviewError(String generalMessage, BindingResult bindingResult) {

        throw new ReviewException(buildErrorMessage(generalMessage, bindingResult));
    }

    public static void returnDiscussionError(String generalMessage, BindingResult bindingResult) {

        throw new DiscussionException(buildErrorMessage(generalMessage, bindingResult));
    }

    public static void returnPaymentError(String message) {

        throw new PaymentException(message);
    }

    private static String buildErrorMessage(String generalMessage, BindingResult bindingResult) {

        StringBuilder errorMessage = new StringBuilder();

        if (bindingResult != null) {

            List<FieldError> errors = bindingResult.getFieldErrors();

            for (FieldError error : errors) {
                errorMessage.append(error.getField())
                        .append(": ")
                        .append(error.getDefaultMessage() == null ? error.getCode() : error.getDefaultMessage())
                        .append("; ");
            }

        }

        return generalMessage + " " + errorMessage;
    }
}
