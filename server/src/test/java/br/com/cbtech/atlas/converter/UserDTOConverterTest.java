package br.com.cbtech.atlas.converter;

import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.domain.dto.UserDTO;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UserDTOConverterTest {

    UserDTOConverter converter = new UserDTOConverter();

    @Test
    void to() {
        User entity = new User();
        entity.setId(UUID.randomUUID());
        entity.setUsername("teste");
        entity.setAccountNonExpired(Boolean.TRUE);
        entity.setAccountNonLocked(Boolean.TRUE);
        entity.setCredentialsNonExpired(Boolean.TRUE);
        entity.setEnabled(Boolean.TRUE);

        UserDTO dto = converter.to(entity);

        assertThat(dto.getId()).isEqualTo(entity.getId());
        assertThat(dto.getUsername()).isEqualTo(entity.getUsername());
        assertThat(dto.getAccountNonExpired()).isEqualTo(entity.getAccountNonExpired());
        assertThat(dto.getAccountNonLocked()).isEqualTo(entity.getAccountNonLocked());
        assertThat(dto.getCredentialsNonExpired()).isEqualTo(entity.getCredentialsNonExpired());
        assertThat(dto.getEnabled()).isEqualTo(entity.getEnabled());
    }

    @Test
    void toNullValue() {
        assertThat(converter.to(null)).isNull();
    }
}
