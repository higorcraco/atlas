package br.com.cbtech.atlas.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EchoController {

    @GetMapping("api/echo/{value}")
    public ResponseEntity<String> echo(@PathVariable(value = "value") String value) {
//        throw new IllegalCallerException("ilegal hein");
        return ResponseEntity.ok(value);
    }

}
