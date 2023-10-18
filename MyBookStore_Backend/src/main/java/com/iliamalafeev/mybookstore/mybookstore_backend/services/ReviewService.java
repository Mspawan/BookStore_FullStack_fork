package com.iliamalafeev.mybookstore.mybookstore_backend.services;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.ReviewDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Book;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Review;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.BookRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.ReviewRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.ErrorsUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class ReviewService {

    private final ModelMapper modelMapper;
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReviewService(ModelMapper modelMapper, ReviewRepository reviewRepository, BookRepository bookRepository) {
        this.modelMapper = modelMapper;
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
    }

    public Page<ReviewDTO> findAllByBookId(Long bookId, Pageable pageable, boolean latest) {

        Book book = getBookFromRepository(bookId);

        Page<Review> reviews;

        if (latest) reviews = reviewRepository.findAllByReviewedBookOrderByIdDesc(book, pageable);
        else reviews = reviewRepository.findByReviewedBook(book, pageable);

        return reviews.map(this::convertToReviewDTO);
    }

    public Double getAverageRatingByBookId(Long bookId) {

        Book book = getBookFromRepository(bookId);

        Double rating = reviewRepository.getAverageRatingByReviewedBook(book);

        if (rating == null) return 0.0;

        return rating;
    }

    private Book getBookFromRepository(Long bookId) {

        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty()) {
            ErrorsUtil.returnBookError("Book not found", null);
        }

        return book.get();
    }

    private ReviewDTO convertToReviewDTO(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }
}
