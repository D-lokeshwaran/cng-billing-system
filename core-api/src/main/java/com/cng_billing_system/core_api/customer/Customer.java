package com.cng_billing_system.core_api.customer;

import com.cng_billing_system.core_api.bill.Bill;
import com.cng_billing_system.core_api.document.Document;
import com.cng_billing_system.core_api.enums.States;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.IdGeneratorType;

import java.util.List;

import static jakarta.persistence.CascadeType.REMOVE;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number")
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

    @PostPersist
    @PostLoad
    private void generateAccountNumber() {
        if (this.accountNumber == null) {
            String PREFIX = "G";
            this.accountNumber = PREFIX + this.id;
        }
    }

}