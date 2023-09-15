package com.iliamalafeev.mybookstore.mybookstore_backend.utils;

import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.BookException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.PaymentException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.PersonException;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.ReviewException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

public class ErrorsUtil {

    public static void returnBookError(String generalMessage, BindingResult bindingResult) {

        String bindingResultMessage = bindingResult == null ? "" : buildErrorMessage(bindingResult);
        String message = generalMessage + " " + bindingResultMessage;
        throw new BookException(message);
    }

    public static void returnPersonError(String generalMessage, BindingResult bindingResult) {

        String bindingResultMessage = bindingResult == null ? "" : buildErrorMessage(bindingResult);
        String message = generalMessage + " " + bindingResultMessage;
        throw new PersonException(message);
    }

    public static void returnReviewError(String generalMessage, BindingResult bindingResult) {

        String bindingResultMessage = bindingResult == null ? "" : buildErrorMessage(bindingResult);
        String message = generalMessage + " " + bindingResultMessage;
        throw new ReviewException(message);
    }

    public static void returnPaymentError(String message) {

        throw new PaymentException(message);
    }

    private static String buildErrorMessage(BindingResult bindingResult) {

        StringBuilder errorMessage = new StringBuilder();

        List<FieldError> errors = bindingResult.getFieldErrors();

        for (FieldError error : errors) {
            errorMessage.append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage() == null ? error.getCode() : error.getDefaultMessage())
                    .append("; ");
        }

        return errorMessage.toString();
    }
}
