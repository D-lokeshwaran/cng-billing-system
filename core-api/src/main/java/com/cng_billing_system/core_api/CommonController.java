package com.cng_billing_system.core_api;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.bill.BillRepository;
import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.customer.CustomerRepository;
import com.cng_billing_system.core_api.tariff.Tariff;
import com.cng_billing_system.core_api.tariff.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
public class CommonController {

    private final CustomerRepository customerRepository;
    private final BillRepository billRepository;
    private final TariffRepository tariffRepository;

    @Autowired
    public CommonController(CustomerRepository customerRepository, BillRepository billRepository,
                            TariffRepository tariffRepository) {
        this.customerRepository = customerRepository;
        this.billRepository = billRepository;
        this.tariffRepository = tariffRepository;
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

    @GetMapping("/global-search/{searchText}")
    public Map<String, Object> retrieveSearchResult(@PathVariable String searchText) {
        Map<String, Object> searchResult = new LinkedHashMap<>();
        List<Bill> searchedBills = billRepository.searchByText(searchText);
        searchResult.put("bills", searchedBills);
        List<Customer> searchedCustomers = customerRepository.searchByText(searchText);
        searchResult.put("customers", searchedCustomers);
        List<Tariff> searchedTariffs = tariffRepository.searchByText(searchText);
        searchResult.put("tariffs", searchedTariffs);
        return searchResult;
    }

}
