package com.cng_billing_system.core_api;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.bill.BillRepository;
import com.cng_billing_system.core_api.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
public class CommonController {

    private final CustomerRepository customerRepository;

    private final BillRepository billRepository;

    @Autowired
    public CommonController(CustomerRepository customerRepository, BillRepository billRepository) {
        this.customerRepository = customerRepository;
        this.billRepository = billRepository;
    }

    @DeleteMapping("/bulk-delete-customers")
    public void bulkDeleteCustomers(@RequestBody Map<String, Object> body) {
        List<Long> ids = (List<Long>) body.get("ids");
        customerRepository.deleteByIdIn(ids);
    }

    @DeleteMapping("/bulk-delete-bills")
    public void bulkDeleteBills(@RequestBody Map<String, Object> body) {
        List<Long> ids = (List<Long>) body.get("ids");
        billRepository.deleteByIdIn(ids);
    }

    @GetMapping("/bills-with-customer")
    public List<Bill> retrieveBillsWithCustomer() {
        List<Bill> allBills = billRepository.findAll();
        return allBills;
    }

}
