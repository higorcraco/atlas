package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsername(username);
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);

        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException(String.format("Usuário %s não encontrado.", username));
        }

        return user;
    }
}
