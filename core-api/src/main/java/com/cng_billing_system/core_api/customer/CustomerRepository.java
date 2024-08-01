package com.cng_billing_system.core_api.customer;

import com.cng_billing_system.core_api.bill.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @RestResource(exported = false)
    void deleteByIdIn(List<Long> ids);

    @RestResource(exported = false)
    @Query(nativeQuery = true, value =
            "SELECT * FROM customers c WHERE " +
                    "c.account_number LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(c.full_name) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(c.email_address) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "c.contact_number LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(c.state) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(c.billing_address) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(c.city) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "c.pincode LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Customer> searchByText(@Param("searchText") String searchText);

}
