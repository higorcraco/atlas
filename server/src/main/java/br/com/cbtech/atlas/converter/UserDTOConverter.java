package br.com.cbtech.atlas.converter;

import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.domain.dto.UserDTO;

import static java.util.Objects.isNull;

public class UserDTOConverter {
    public static UserDTO to(User entity) {
        if (isNull(entity)) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setAccountNonExpired(entity.getAccountNonExpired());
        dto.setAccountNonLocked(entity.getAccountNonLocked());
        dto.setCredentialsNonExpired(entity.getCredentialsNonExpired());
        dto.setEnabled(entity.getEnabled());
        return dto;
    }
}
