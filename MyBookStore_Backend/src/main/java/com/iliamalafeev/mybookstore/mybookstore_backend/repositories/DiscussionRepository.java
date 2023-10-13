package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Discussion;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    Page<Discussion> findByDiscussionHolder(Person person, Pageable pageable);

    List<Discussion> findByClosed(boolean isClosed);
}
