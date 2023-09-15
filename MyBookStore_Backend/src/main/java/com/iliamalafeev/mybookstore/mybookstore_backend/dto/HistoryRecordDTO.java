package com.iliamalafeev.mybookstore.mybookstore_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class HistoryRecordDTO {

    private BookDTO bookDTO;

    private LocalDate checkoutDate;

    private LocalDate returnDate;
}
