package com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookErrorResponse {

    private String message;
    private long timestamp;
}
