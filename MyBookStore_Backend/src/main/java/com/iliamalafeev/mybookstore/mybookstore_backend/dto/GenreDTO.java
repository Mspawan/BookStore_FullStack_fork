package com.iliamalafeev.mybookstore.mybookstore_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreDTO {

    @NotBlank(message = "Genre description must contain at least 1 character")
    @Size(max = 50, message = "Genre description length must not exceed 50 characters")
    private String description;
}
