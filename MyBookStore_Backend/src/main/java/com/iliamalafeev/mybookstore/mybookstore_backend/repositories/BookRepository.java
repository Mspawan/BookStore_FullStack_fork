package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Book;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByTitleAndAuthor(String title, String author); // This method is required for BookValidator

    List<Book> findByTitleContaining(String query);

    List<Book> findByGenresContains(Genre genre);
}
