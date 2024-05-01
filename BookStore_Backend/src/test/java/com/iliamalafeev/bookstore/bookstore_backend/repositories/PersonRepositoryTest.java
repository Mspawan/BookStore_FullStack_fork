package com.iliamalafeev.bookstore.bookstore_backend.repositories;

import com.iliamalafeev.bookstore.bookstore_backend.entities.Person;
import com.iliamalafeev.bookstore.bookstore_backend.security.entities.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("/schema.sql")
class PersonRepositoryTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgre = new PostgreSQLContainer<>("postgres:alpine");

    private Person person;
    private final PersonRepository personRepository;

    @Autowired
    PersonRepositoryTest(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @BeforeEach
    void setUp() {

        person = new Person();
        person.setFirstName("firstName");
        person.setLastName("lastName");
        person.setDateOfBirth(LocalDate.of(1990, 1, 1));
        person.setEmail("email@email.com");
        person.setPassword("password");
        person.setRole(Role.ROLE_USER);
        person.setRegisteredAt(LocalDateTime.now());
    }

    @Test
    void connectionEstablished() {
        assertTrue(postgre.isCreated());
        assertTrue(postgre.isRunning());
    }

    @Test
    public void save_shouldSavePersonToDatabase() {

        Person savedPerson = personRepository.save(person);

        assertNotNull(savedPerson);
        assertEquals(person.getFirstName(), savedPerson.getFirstName());
        assertEquals(person.getLastName(), savedPerson.getLastName());
        assertEquals(person.getDateOfBirth(), savedPerson.getDateOfBirth());
        assertEquals(person.getEmail(), savedPerson.getEmail());
        assertEquals(person.getPassword(), savedPerson.getPassword());
        assertTrue(savedPerson.getId() > 0);
    }

    @Test
    public void findByEmail_shouldFindPersonByEmail() {

        personRepository.save(person);
        Person foundPerson = personRepository.findByEmail("email@email.com").orElse(null);

        assertNotNull(foundPerson);
        assertEquals(person.getFirstName(), foundPerson.getFirstName());
        assertEquals(person.getLastName(), foundPerson.getLastName());
        assertEquals(person.getDateOfBirth(), foundPerson.getDateOfBirth());
        assertEquals(person.getEmail(), foundPerson.getEmail());
        assertEquals(person.getPassword(), foundPerson.getPassword());
        assertTrue(foundPerson.getId() > 0);
    }

    @Test
    public void findByEmail_shouldNotFindPersonByIncorrectEmail() {

        Person foundPerson = personRepository.findByEmail("incorrectEmail@email.com").orElse(null);

        assertNull(foundPerson);
    }
}