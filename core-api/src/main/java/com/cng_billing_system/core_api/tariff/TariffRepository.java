package com.cng_billing_system.core_api.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Date;

@RepositoryRestResource(collectionResourceRel = "tariffs", path = "tariffs")
public interface TariffRepository extends JpaRepository<Tariff, Long> {

    @Query("SELECT t FROM Tariff t " +
            "WHERE t.fromDate < CURRENT_DATE() AND t.toDate > CURRENT_DATE()")
    Tariff findTodayTariff();

    @Query("SELECT t FROM Tariff t " +
            "WHERE t.fromDate < :searchDate AND t.toDate > :searchDate")
    Tariff findByDate(@Param("searchDate") Date searchDate);


}
