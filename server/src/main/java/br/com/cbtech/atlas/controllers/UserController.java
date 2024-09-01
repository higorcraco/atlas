package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.converter.UserDTOConverter;
import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.domain.dto.UserDTO;
import br.com.cbtech.atlas.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserDTOConverter converter = new UserDTOConverter();

    @PostMapping
    public ResponseEntity<UserDTO> addUser(@RequestBody User user) {
        UserDTO dto = converter.to(userService.addCommonUser(user));
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        List<UserDTO> dtoList = userService.findAll().stream().map(converter::to).toList();

        return ResponseEntity.ok(dtoList);
    }
}
