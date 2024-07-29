package com.cng_billing_system.core_api;

import com.cng_billing_system.core_api.customer.CustomerRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class CommonController {

    private final CustomerRepository customerRepository;

    public CommonController(CustomerRepository customerEventHandler) {
        this.customerRepository = customerEventHandler;
    }

    @Transactional
    @DeleteMapping("/bulk-delete-customers")
    public void bulkDeleteCustomers(@RequestBody Map<String, Object> body) {
        List<Long> ids = (List<Long>) body.get("ids");
        customerRepository.deleteByIdIn(ids);
    }

}
