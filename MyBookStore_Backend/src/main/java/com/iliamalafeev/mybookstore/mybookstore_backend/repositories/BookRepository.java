package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Book;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByTitleAndAuthor(String title, String author); // This method is required for BookValidator

    Page<Book> findByTitleContainingIgnoreCase(String query, Pageable pageable);

    Page<Book> findByGenresContains(Genre genre, Pageable pageable);
}
