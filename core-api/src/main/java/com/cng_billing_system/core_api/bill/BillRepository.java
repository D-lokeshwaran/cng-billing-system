package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "bills", path = "bills")
public interface BillRepository extends JpaRepository<Bill, Long> {
}
