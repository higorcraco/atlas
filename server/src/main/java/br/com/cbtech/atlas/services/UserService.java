package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.Permission;
import br.com.cbtech.atlas.domain.User;
import br.com.cbtech.atlas.repositories.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PermissionService permissionService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository,
                       PermissionService permissionService,
                       @Lazy PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.permissionService = permissionService;
        this.passwordEncoder = passwordEncoder;
    }

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

    public User addCommonUser(User user) {
        Permission permission = permissionService.findById(3L);

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        User commonUser = new User();
        commonUser.setUsername(user.getUsername());
        commonUser.setPassword(
                encodedPassword.split("\\{pbkdf2}")[1]
        );

        commonUser.setAccountNonExpired(Boolean.TRUE);
        commonUser.setAccountNonLocked(Boolean.TRUE);
        commonUser.setCredentialsNonExpired(Boolean.TRUE);
        commonUser.setEnabled(Boolean.TRUE);
        commonUser.setPermissions(new ArrayList<>(List.of(permission)));
        return repository.saveAndFlush(commonUser);
    }
}
