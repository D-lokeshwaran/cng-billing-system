package com.cng_billing_system.core_api.customer;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.document.Document;
import com.cng_billing_system.core_api.enums.States;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.CascadeType.REMOVE;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_id_seq")
    @SequenceGenerator(name = "customer_id_seq", sequenceName = "customer_id_seq", allocationSize = 1, initialValue = 1200)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "account_number", length = 16)
    private String accountNumber;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(length = 10)
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private States state;

    @Column(name = "billing_address")
    private String billingAddress;

    private String city;

    @Column(length = 6)
    private Integer pincode;

    @OneToMany(mappedBy = "customer", cascade = REMOVE)
    @JsonIgnore
    private List<Bill> bills;

    @OneToMany(mappedBy = "customer", cascade = REMOVE)
    @JsonIgnore
    private List<Document> documents;

    @PrePersist
    private void generateAccountNumber() {
        String PREFIX = "CG";
        this.setAccountNumber(PREFIX + id);
    }

}