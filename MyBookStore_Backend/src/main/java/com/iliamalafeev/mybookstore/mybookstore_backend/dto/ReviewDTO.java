package com.iliamalafeev.mybookstore.mybookstore_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {

    @NotNull(message = "Rating must be present")
    private Double rating;

    private String reviewDescription;
}
