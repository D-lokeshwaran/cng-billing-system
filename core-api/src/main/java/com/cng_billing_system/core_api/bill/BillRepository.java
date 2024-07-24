package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RepositoryRestResource(collectionResourceRel = "bills", path = "bills")
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("SELECT SUM(b.billAmount) FROM Bill b WHERE b.paymentStatus = 'Paid'")
    BigDecimal getTotalRevenue();

    List<Bill> findAllByPaymentStatus(PaymentStatus paymentStatus);

    @Query(nativeQuery = true, value =
            "SELECT sum(bill_amount) as \"revenue\" " +
            "FROM bills " +
            "WHERE year(billing_date) = year(curDate())" +
            "AND payment_status = 'Paid' " +
            "GROUP BY month(billing_date)"
    )
    List<BigDecimal> getMonthlyRevenue();

    @Query("SELECT b FROM Bill b ORDER BY b.createAt ASC")
    List<Bill> recentBills();

}
