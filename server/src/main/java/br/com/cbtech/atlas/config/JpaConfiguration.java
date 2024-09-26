package br.com.cbtech.atlas.config;

import br.com.cbtech.atlas.audit.AuditorAwareImpl;
import br.com.cbtech.atlas.repositories.RsqlRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaRepositories(
        basePackages = {"br.com.cbtech.atlas.repositories"},
        repositoryBaseClass = RsqlRepositoryImpl.class)
@EnableTransactionManagement
@EnableJpaAuditing
@Configuration
public class JpaConfiguration {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
