package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
