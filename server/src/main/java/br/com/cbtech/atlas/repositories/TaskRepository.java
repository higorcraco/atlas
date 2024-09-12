package br.com.cbtech.atlas.repositories;

import br.com.cbtech.atlas.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    @Query("SELECT COALESCE(MAX(t.position), 0) FROM Task t where t.completed = false")
    Long findMaxTaskNonCompletedPosition();
}
