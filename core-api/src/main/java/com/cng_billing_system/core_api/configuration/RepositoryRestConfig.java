package com.cng_billing_system.core_api.configuration;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.document.Document;
import com.cng_billing_system.core_api.tariff.Tariff;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RepositoryRestConfig {

    @Value("${baseURL}")
    private String baseURL;

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {

        return new RepositoryRestConfigurer() {

            @Override
            public void configureRepositoryRestConfiguration(
                    RepositoryRestConfiguration config,
                    CorsRegistry cors
            ) {
                config.setBasePath(baseURL);
                config.exposeIdsFor(
                    Customer.class,
                    Bill.class,
                    Tariff.class,
                    Document.class
                );
            }

        };

    }
}
