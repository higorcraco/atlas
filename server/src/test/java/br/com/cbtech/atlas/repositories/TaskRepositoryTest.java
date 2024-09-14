package br.com.cbtech.atlas.repositories;

import br.com.cbtech.atlas.domain.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Rollback
@Sql(statements = {
        "INSERT INTO TASK(ID, POSITION, DESCRIPTION, COMPLETED) VALUES ('afbbf0a0-cc88-4a63-8479-c59d45339704', 1, 'TESTE01', FALSE);",
        "INSERT INTO TASK(ID, POSITION, DESCRIPTION, COMPLETED) VALUES ('429fa6fc-9634-499f-84c9-f26d097834d9', 2, 'TESTE02', FALSE);",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_CLASS)
class TaskRepositoryTest {
    @Autowired
    private TaskRepository repository;

    @Test
    void create() {
        Task entity = new Task();
        entity.setDescription("test-task");
        entity.setPosition(1L);

        repository.saveAndFlush(entity);

        assertThat(entity.getId()).isNotNull();
        assertThat(entity.getPosition()).isEqualTo(1L);
        assertThat(entity.getDescription()).isEqualTo("test-task");
        assertThat(entity.getCompleted()).isFalse();
    }

    @Test
    void findOne() {
        Optional<Task> entity = repository.findById(UUID.fromString("afbbf0a0-cc88-4a63-8479-c59d45339704"));
        assertThat(entity.isPresent()).isTrue();
    }

    @Test
    void findMaxTaskNonCompletedPosition() {
        assertThat(repository.findMaxTaskNonCompletedPosition()).isEqualTo(2L);
    }

}
