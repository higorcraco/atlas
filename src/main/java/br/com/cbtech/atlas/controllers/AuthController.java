package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.domain.dto.security.AccountCredentialsDTO;
import br.com.cbtech.atlas.domain.dto.security.TokenDTO;
import br.com.cbtech.atlas.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping(value = "/signin")
    public ResponseEntity<?> signin(@RequestBody AccountCredentialsDTO accountCredentials) {
        TokenDTO token = authService.signin(accountCredentials);

        if (Objects.isNull(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
        }

        return ResponseEntity.ok(token);
    }

    @PutMapping(value = "/refresh/{username}")
    public ResponseEntity<?> refreshToken(@PathVariable("username") String username,
                                          @RequestHeader("Authorization") String refreshToken) {
        if (Objects.isNull(refreshToken) || refreshToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
        }

        TokenDTO token = authService.refreshToken(username, refreshToken);

        if (Objects.isNull(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
        }

        return ResponseEntity.ok(token);
    }
}
