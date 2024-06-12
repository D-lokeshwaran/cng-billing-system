package com.cng_billing_system.core_api.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tariffs", path = "tariffs")
public interface TariffRepository extends JpaRepository<Tariff, Long> {
}
