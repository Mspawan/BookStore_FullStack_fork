package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Discussion;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    List<Discussion> findByDiscussionHolder(Person person);

    List<Discussion> findByClosed(boolean isClosed);
}
