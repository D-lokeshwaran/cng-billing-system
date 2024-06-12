package com.cng_billing_system.core_api.document;

import com.cng_billing_system.core_api.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String documentName;

    private Date date;

    private String document;

    @ManyToOne
    private Customer customer;

}
