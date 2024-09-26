package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.domain.LoggedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class EchoController {
    private final LoggedUserService loggedUserService;

    @GetMapping("api/echo/{value}")
    public ResponseEntity<String> echo(@PathVariable(value = "value") String value) {
        return ResponseEntity.ok(value);
    }

    @GetMapping("api/me")
    public ResponseEntity<LoggedUser> getLoggedUser() {
        return ResponseEntity.ok(loggedUserService.getLoggedUser());
    }
}
