package br.com.cbtech.atlas.repositories;

import br.com.cbtech.atlas.domain.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Rollback
@Sql(statements = {
        "INSERT INTO TASK(ID, POSITION, TITLE, DESCRIPTION, COMPLETED) VALUES (1001, 1, 'TESTE01', 'DESCRIPTION01', FALSE);",
        "INSERT INTO TASK(ID, POSITION, TITLE, DESCRIPTION, COMPLETED) VALUES (1002, 2, 'TESTE02', 'DESCRIPTION01', FALSE);",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_CLASS)
class TaskRepositoryTest {
    @Autowired
    private TaskRepository repository;

    @Test
    @WithMockUser(username = "mockUser")
    void create() {
        Task entity = new Task();
        entity.setTitle("not empty title");
        entity.setDescription("test-task");
        entity.setPosition(1L);

        LocalDateTime localDateTime = LocalDateTime.now();

        repository.saveAndFlush(entity);

        assertThat(entity.getId()).isNotNull();
        assertThat(entity.getPosition()).isEqualTo(1L);
        assertThat(entity.getTitle()).isEqualTo("not empty title");
        assertThat(entity.getDescription()).isEqualTo("test-task");
        assertThat(entity.getCompleted()).isFalse();
        assertThat(entity.getAuditInfo().getCreatedBy()).isEqualTo("mockUser");
        assertThat(entity.getAuditInfo().getCreatedDate()).isAfter(localDateTime);
        assertThat(entity.getAuditInfo().getLastModifiedBy()).isEqualTo("mockUser");
        assertThat(entity.getAuditInfo().getLastModifiedDate()).isAfter(localDateTime);
    }

    @Test
    void findOne() {
        Optional<Task> entity = repository.findById(1L);
        assertThat(entity.isPresent()).isTrue();
    }

    @Test
    void findMaxTaskNonCompletedPosition() {
        assertThat(repository.findMaxTaskNonCompletedPosition()).isEqualTo(2L);
    }

}
