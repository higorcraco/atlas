package br.com.cbtech.atlas.services;

import br.com.cbtech.atlas.domain.Permission;
import br.com.cbtech.atlas.exceptions.RegisterNotFoundException;
import br.com.cbtech.atlas.repositories.PermissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class PermissionService {

    private final PermissionRepository repository;

    public Permission findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RegisterNotFoundException("Permission ID " + id));
    }
}
