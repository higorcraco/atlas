package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.domain.Task;
import br.com.cbtech.atlas.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;

    @GetMapping
    public ResponseEntity<Page<Task>> findByRsql(@RequestParam(value = "search", required = false) String search,
                                                 Pageable pageable) {
        return ResponseEntity.ok(service.findByRsql(search, pageable));
    }

    @PostMapping
    public ResponseEntity<Task> save(@RequestBody Task entity) {
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
