package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Book;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Checkout;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Optional<Checkout> findByCheckoutHolderAndCheckedOutBook(Person checkoutHolder, Book checkedOutBook);

    List<Checkout> findByCheckoutHolder(Person checkoutHolder);
}
