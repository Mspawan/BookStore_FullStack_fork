package com.iliamalafeev.mybookstore.mybookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutDTO {

    private BookDTO bookDTO;
    private Integer daysLeft;
}
