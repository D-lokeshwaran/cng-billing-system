package com.cng_billing_system.core_api.document;

import com.cng_billing_system.core_api.audit.AuditModel;
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

    private Long size;

    @ManyToOne
    private Customer customer;

    public Document() {
    };

    public Document(String name, Long size, Customer customer) {
        this.name = name;
        this.size = size;
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", size=" + size +
                ", customer=" + customer +
                '}';
    }
}
