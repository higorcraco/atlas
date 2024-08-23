package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.addCommonUser(user));
    }
}
