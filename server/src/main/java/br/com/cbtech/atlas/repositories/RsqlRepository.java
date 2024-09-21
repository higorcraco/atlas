package br.com.cbtech.atlas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RsqlRepository<T, ID> extends JpaRepository<T, ID> {
    Page<T> findByRsql(String search, Pageable pageable);
}
