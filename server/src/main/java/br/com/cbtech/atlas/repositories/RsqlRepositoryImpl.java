package br.com.cbtech.atlas.repositories;

import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import static io.github.perplexhub.rsql.RSQLJPASupport.toSpecification;

public class RsqlRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> implements RsqlRepository<T, ID> {
    public RsqlRepositoryImpl(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
    }

    @Override
    public Page<T> findByRsql(String search, Pageable pageable) {
        if (search == null || search.isEmpty()) {
            return super.findAll(pageable);
        }

        return this.findAll(toSpecification(search), pageable);
    }
}
