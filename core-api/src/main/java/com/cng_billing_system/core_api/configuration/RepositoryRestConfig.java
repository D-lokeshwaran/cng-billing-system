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
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RepositoryRestConfig {

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {

        return new RepositoryRestConfigurer() {

            @Override
            public void configureRepositoryRestConfiguration(
                    RepositoryRestConfiguration config,
                    CorsRegistry cors
            ) {

                cors.addMapping("/**")
                    .allowedMethods("*")
                    .allowedOrigins("http://localhost:3003", "http://192.168.29.68:3003/");

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
