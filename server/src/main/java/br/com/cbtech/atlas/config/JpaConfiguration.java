package br.com.cbtech.atlas.config;

import br.com.cbtech.atlas.repositories.RsqlRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaRepositories(
        basePackages = {"br.com.cbtech.atlas.repositories"},
        repositoryBaseClass = RsqlRepositoryImpl.class)
@EnableTransactionManagement
@Configuration
public class JpaConfiguration {
}
