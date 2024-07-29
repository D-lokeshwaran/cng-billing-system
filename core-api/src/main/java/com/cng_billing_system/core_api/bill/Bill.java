package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.AuditModel;
import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.enums.PaymentStatus;
import com.cng_billing_system.core_api.tariff.Tariff;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "bills")
@Getter
@Setter
public class Bill extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Integer unitsConsumed;

    @Enumerated(value = EnumType.STRING)
//    @Column(columnDefinition = "ENUM('Pending', 'Paid', 'Overdue', 'Not_Billed') default 'Not_Billed'")
    private PaymentStatus paymentStatus = PaymentStatus.Pending;

    private BigDecimal billAmount;

    private Date billingDate;

    private Date paymentDueDate;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Tariff tariff;

}