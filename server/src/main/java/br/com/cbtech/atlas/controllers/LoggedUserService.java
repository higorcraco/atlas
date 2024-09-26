package br.com.cbtech.atlas.controllers;

import br.com.cbtech.atlas.domain.LoggedUser;
import br.com.cbtech.atlas.exceptions.SecurityContextHolderException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class LoggedUserService {
    private LoggedUser loggedUser;

    public LoggedUser getLoggedUser() {
        if (nonNull(loggedUser)) {
            return loggedUser;
        }

        return getLoggedUserFromToken();
    }

    private LoggedUser getLoggedUserFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (isNull(authentication) || isNull(authentication.getPrincipal())) {
            throw new SecurityContextHolderException("Authentication Principal not found.");
        }

        if (!(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            throw new SecurityContextHolderException("Principal it's not a UserDetails instance.");
        }

        loggedUser = new LoggedUser();
        loggedUser.setUsername(userDetails.getUsername());

        return loggedUser;
    }
}
