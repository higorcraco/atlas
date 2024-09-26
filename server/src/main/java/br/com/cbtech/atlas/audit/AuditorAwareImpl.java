package br.com.cbtech.atlas.audit;

import br.com.cbtech.atlas.controllers.LoggedUserService;
import br.com.cbtech.atlas.domain.LoggedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {
    @Autowired
    private LoggedUserService loggedUserService;


    @Override
    public Optional<String> getCurrentAuditor() {
        LoggedUser loggedUser = loggedUserService.getLoggedUser();
        return Optional.of(loggedUser.getUsername());
    }
}
