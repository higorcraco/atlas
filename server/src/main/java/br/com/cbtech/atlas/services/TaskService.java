package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.Task;
import br.com.cbtech.atlas.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository repository;

    public Page<Task> findByRsql(String search, Pageable pageable) {
        return repository.findByRsql(search, pageable);
    }

    public Page<Task> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Task save(Task task) {
        if (NumberUtils.LONG_ZERO.equals(task.getPosition())) {
            task.setPosition(repository.findMaxTaskNonCompletedPosition() + 1);
        }
        return repository.saveAndFlush(task);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
