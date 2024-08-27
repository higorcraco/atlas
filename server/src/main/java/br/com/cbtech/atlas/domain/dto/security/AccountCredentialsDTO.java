package br.com.cbtech.atlas.domain.dto.security;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class AccountCredentialsDTO implements Serializable {
    private String username;
    private String password;
}
