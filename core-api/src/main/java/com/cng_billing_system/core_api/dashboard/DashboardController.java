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
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
        overview.put("sales", billRepository.findAllByPaymentStatus(PaymentStatus.Paid).size());
        overview.put("activeBills", billRepository.findAllByPaymentStatus(PaymentStatus.Pending).size());

        // revenue overview Monthly and weekly
        List<Map<BigDecimal, Integer>> monthlyRevenue = billRepository.getMonthlyRevenue();
        overview.put("monthlyRevenue", monthlyRevenue);
        List<Map<BigDecimal, Integer>> weeklyRevenue = billRepository.getWeeklyRevenue();
        overview.put("weeklyRevenue", weeklyRevenue);

        // Recent bills first 5 with customer
        List<Bill> recent5Bills = billRepository.recent5Bills();
        List<Map<String, Object>> recentBills = new ArrayList<>();
        Map<String, Object> recentBillRow = new LinkedHashMap<>();
        for (Bill recentBill : recent5Bills) {
            recentBillRow.put("status", recentBill.getPaymentStatus());
            recentBillRow.put("amount", recentBill.getBillAmount());
            if (recentBill.getCustomer() != null) {
                Map<String, Object> customer = new LinkedHashMap<>();
                customer.put("fullName", recentBill.getCustomer().getFullName());
                customer.put("accountNumber", recentBill.getCustomer().getAccountNumber());
                recentBillRow.put("customer", customer);
            }
            recentBills.add(recentBillRow);
        }
        overview.put("recentBills", recentBills);

        return overview;
    }

}
