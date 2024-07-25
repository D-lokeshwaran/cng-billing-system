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
        "SELECT sum(bill_amount) as \"revenue\", " +
                "month(updated_at) as \"month\" " +
            "FROM bills " +
            "WHERE year(updated_at) = year(curDate())" +
                "AND payment_status = 'Paid' " +
            "GROUP BY month(updated_at) " +
            "ORDER BY month(updated_at) asc"
    )
    List<Map<BigDecimal, Integer>> getMonthlyRevenue();

    @Query(nativeQuery = true, value =
        "SELECT sum(bill_amount) as \"revenue\", " +
                "week(updated_at) as \"week\" " +
            "FROM bills " +
            "WHERE month(updated_at) = month(curDate()) " +
                "AND payment_status = 'Paid' " +
            "GROUP BY week(updated_at) " +
            "ORDER BY week(updated_at) asc"
    )
    List<Map<BigDecimal, Integer>> getWeeklyRevenue();

    @Query(nativeQuery = true, value =
            "SELECT b.*, (c.full_name, c.account_number) as customer FROM bills b, customers c\n" +
            "WHERE b.customer_id = c.id\n" +
            "ORDER BY created_at ASC\n" +
            "LIMIT 5"
    )
    List<Bill> recent5Bills();

}
