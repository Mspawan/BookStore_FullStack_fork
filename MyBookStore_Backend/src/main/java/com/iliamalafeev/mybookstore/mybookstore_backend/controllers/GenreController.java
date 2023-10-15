package com.iliamalafeev.mybookstore.mybookstore_backend.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.GenreDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    @Autowired
    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<GenreDTO> findAll() {
        return genreService.findAll();
    }
}
