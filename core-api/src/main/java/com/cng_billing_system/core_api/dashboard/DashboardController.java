package com.cng_billing_system.core_api.dashboard;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.bill.BillRepository;
import com.cng_billing_system.core_api.customer.CustomerRepository;
import com.cng_billing_system.core_api.enums.PaymentStatus;
import com.cng_billing_system.core_api.tariff.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/dashboard")
public class DashboardController {

    private final BillRepository billRepository;

    private final CustomerRepository customerRepository;

    @Autowired
    public DashboardController(BillRepository billRepository, CustomerRepository customerRepository, TariffRepository tariffRepository) {
        this.billRepository = billRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public Map<String, Object> retrieveDashboardInfo() {
        Map<String, Object> overview = new LinkedHashMap<>();

        // totalRevenue, customers, sales, activeBills
        BigDecimal totalRevenue = billRepository.getTotalRevenue();
        overview.put("totalRevenue", totalRevenue != null ? totalRevenue : 0);
        overview.put("customers", customerRepository.findAll().size());
        overview.put("sales", billRepository.findAllByPaymentStatus(PaymentStatus.Completed).size());
        overview.put("activeBills", billRepository.findAllByPaymentStatus(PaymentStatus.Pending).size());

        // yearly breakups
        List<Map<BigDecimal, Integer>> yearlyBreakups = billRepository.getYearlyBreakups();
        System.out.println(yearlyBreakups);

        // revenue overview Monthly and weekly
        List<Map<BigDecimal, Integer>> monthlyRevenue = billRepository.getMonthlyRevenue();
        overview.put("monthlyRevenue", monthlyRevenue);
        List<Map<BigDecimal, Integer>> weeklyRevenue = billRepository.getWeeklyRevenue();
        overview.put("weeklyRevenue", weeklyRevenue);

        // Recent bills first 5 with customer
        List<Map<String, Object>> recent5Bills = billRepository.recent5Bills();
        List<Object> recentBills = new LinkedList<>();
        for (Map<String, Object> bill : recent5Bills) {
            Map<String, Object> record = new HashMap<>();
            record.put("status", bill.get("paymentStatus"));
            record.put("amount", bill.get("billAmount"));
            Map<String, Object> customer = new LinkedHashMap<>();
            customer.put("fullName", bill.get("fullName"));
            customer.put("accountNumber", bill.get("accountNumber"));
            record.put("customer", customer);

            recentBills.add(record);
        }
        overview.put("recentBills", recentBills);

        return overview;
    }

}
