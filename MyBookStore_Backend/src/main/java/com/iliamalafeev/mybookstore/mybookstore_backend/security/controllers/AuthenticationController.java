package com.iliamalafeev.mybookstore.mybookstore_backend.security.controllers;

import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.requests.PersonLoginDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.requests.PersonRegistrationDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.responses.AuthenticationResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.services.AuthenticationService;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.error_responses.PersonErrorResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.exceptions.PersonException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid PersonRegistrationDTO personRegistrationDTO,
                                                           BindingResult bindingResult) {

        return ResponseEntity.ok(authenticationService.registerPerson(personRegistrationDTO, bindingResult));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid PersonLoginDTO personLoginDTO,
                                                               BindingResult bindingResult) {

        return ResponseEntity.ok(authenticationService.authenticatePerson(personLoginDTO, bindingResult));
    }

    @ExceptionHandler
    private ResponseEntity<PersonErrorResponse> handleException(PersonException e) {
        PersonErrorResponse response = new PersonErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
