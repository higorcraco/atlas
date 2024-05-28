package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.domain.dto.security.AccountCredentialsDTO;
import br.com.cbtech.atlas.domain.dto.security.TokenDTO;
import br.com.cbtech.atlas.security.JWT.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService service;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserService service) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.service = service;
    }

    public void verifyAccountCredentinals(AccountCredentialsDTO accountCredentials) {
        if (Objects.isNull(accountCredentials)) {
            throw new BadCredentialsException("Credendials not informed");
        }

        if (Objects.isNull(accountCredentials.getUsername())) {
            throw new BadCredentialsException("username not informed");
        }

        if (Objects.isNull(accountCredentials.getPassword())) {
            throw new BadCredentialsException("Password not informed");
        }
    }

    public TokenDTO signin(AccountCredentialsDTO accountCredentials) {
        verifyAccountCredentinals(accountCredentials);


        String username = accountCredentials.getUsername();
        String password = accountCredentials.getPassword();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        User user = service.findByUsername(username);

        return tokenProvider.createAccessToken(username, user.getRoles());

    }

    public TokenDTO refreshToken(String username, String refreshToken) {
        service.findByUsername(username);

        return tokenProvider.refreshToken(refreshToken);
    }
}
