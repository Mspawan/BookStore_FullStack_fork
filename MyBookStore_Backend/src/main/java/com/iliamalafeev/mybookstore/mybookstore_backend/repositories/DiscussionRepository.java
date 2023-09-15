package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}
