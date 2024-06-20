package com.cng_billing_system.core_api.document;

import com.cng_billing_system.core_api.AuditModel;
import com.cng_billing_system.core_api.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private String document;

    @ManyToOne
    private Customer customer;

    public Document() {
    }
    public Document(String name, String document) {
        this.name = name;
        this.document = document;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", document='" + document + '\'' +
                ", customer=" + customer +
                '}';
    }
}
