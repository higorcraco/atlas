package br.com.cbtech.atlas.repositories;

import br.com.cbtech.atlas.domain.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends RsqlRepository<Task, Long> {
    @Query("SELECT COALESCE(MAX(t.position), 0) FROM Task t")
    Long findMaxTaskNonCompletedPosition();
}
