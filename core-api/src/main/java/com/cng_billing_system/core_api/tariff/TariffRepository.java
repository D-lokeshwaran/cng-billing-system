package com.cng_billing_system.core_api.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "tariffs", path = "tariffs")
public interface TariffRepository extends JpaRepository<Tariff, Long> {

    @Query("SELECT t FROM Tariff t " +
            "WHERE t.fromDate <= CURRENT_DATE() AND t.toDate >= CURRENT_DATE()")
    Tariff findTodayTariff();

    @Query("SELECT t FROM Tariff t " +
            "WHERE t.fromDate < :searchDate AND t.toDate > :searchDate")
    Tariff findByDate(@Param("searchDate") Date searchDate);

    @Query(
            name = "findByToDateBefore",
            nativeQuery = true,
            value = "SELECT * FROM tariffs " +
                    "WHERE to_date > ?"
    )
    List<Tariff> checkDuplicate(String fromDate);

    @RestResource(exported = false)
    @Query(nativeQuery = true, value =
            "SELECT * FROM tariffs t WHERE " +
                    "t.from_date LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "t.to_date LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "t.id = (" +
                        "SELECT tariff_id FROM tariff_units_and_rates tu WHERE " +
                            "tu.from_unit LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                            "tu.to_unit LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                            "tu.rate_per_unit LIKE LOWER(CONCAT('%', :searchText, '%'))" +
                    ")")
    List<Tariff> searchByText(@Param("searchText") String searchText);

}
