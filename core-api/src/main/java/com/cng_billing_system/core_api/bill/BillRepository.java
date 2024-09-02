package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RepositoryRestResource(collectionResourceRel = "bills", path = "bills")
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("SELECT SUM(b.billAmount) FROM Bill b WHERE b.paymentStatus = 'Completed'")
    BigDecimal getTotalRevenue();

    List<Bill> findAllByPaymentStatus(PaymentStatus paymentStatus);

    @Query(nativeQuery = true, value =
        "SELECT sum(bill_amount) as \"revenue\", " +
                "month(updated_at) as \"month\" " +
            "FROM bills " +
            "WHERE year(updated_at) = year(curDate())" +
                "AND payment_status = 'Completed' " +
            "GROUP BY month(updated_at) " +
            "ORDER BY month(updated_at) asc"
    )
    List<Map<BigDecimal, Integer>> getMonthlyRevenue();

    @Query(nativeQuery = true, value =
        "SELECT sum(bill_amount) as \"revenue\", " +
                "week(updated_at) as \"week\" " +
            "FROM bills " +
            "WHERE month(updated_at) = month(curDate()) " +
                "AND payment_status = 'Completed' " +
            "GROUP BY week(updated_at) " +
            "ORDER BY week(updated_at) asc"
    )
    List<Map<BigDecimal, Integer>> getWeeklyRevenue();

    @Query(nativeQuery = true, value =
            "SELECT sum(bill_amount) as \"revenue\", " +
                    "year(updated_at) as \"week\" " +
                    "FROM bills " +
                    "WHERE dateAdd('year', -1, updated_at) = dateAdd('year', -1, curDate()) " +
                    "AND payment_status = 'Completed' " +
                    "GROUP BY dateAdd('year', -1, updated_at) "
    )
    List<Map<BigDecimal, Integer>> getYearlyBreakups();

    @Query(nativeQuery = true, value =
            "SELECT c.full_name, c.account_number, b.payment_status, b.bill_amount " +
                "FROM bills b, customers c\n" +
            "WHERE b.customer_id = c.id\n" +
                "ORDER BY created_at DESC\n" +
                "LIMIT 5"
    )
    List<Map<String, Object>> recent5Bills();

    @RestResource(exported = false)
    void deleteByIdIn(List<Long> ids);

    @RestResource(exported = false)
    @Query(nativeQuery = true, value =
            "SELECT * FROM bills a WHERE " +
                "a.units_consumed LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                "LOWER(a.payment_status) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                "a.bill_amount LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                "a.billing_date LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                "a.payment_due_date LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Bill> searchByText(@Param("searchText") String searchText);


}
