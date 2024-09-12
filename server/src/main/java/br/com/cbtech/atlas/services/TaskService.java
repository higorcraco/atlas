package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.Task;
import br.com.cbtech.atlas.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository repository;

    public Page<Task> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Task save(Task task) {
        task.setPosition(repository.findMaxTaskNonCompletedPosition() + 1);
        return repository.saveAndFlush(task);
    }
}
