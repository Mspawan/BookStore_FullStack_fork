package com.iliamalafeev.mybookstore.mybookstore_backend.security.services;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.PersonRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.entities.PersonDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Person> person = personRepository.findByEmail(username);

        if (person.isEmpty()) {
            throw new UsernameNotFoundException("No users found with such email.");
        }

        return new PersonDetails(person.get());
    }
}
