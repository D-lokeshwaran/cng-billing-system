package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.AuditModel;
import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.enums.PaymentStatus;
import com.cng_billing_system.core_api.tariff.Tariff;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
//    @Column(columnDefinition = "ENUM('Pending', 'Paid', 'Overdue', 'NotBilled') default 'NotBilled'")
    private PaymentStatus paymentStatus = PaymentStatus.NotBilled;
    private BigDecimal billAmount;

    private Date billingDate;

    private Date paymentDueDate;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    @JsonIgnore
    private Tariff tariff;

    @PrePersist
    @PreUpdate
    public void updatePaymentStatus() {
        if (billAmount != null && paymentStatus == PaymentStatus.NotBilled) {
            setPaymentStatus(PaymentStatus.Pending);
        } else if (paymentStatus == null){
            setPaymentStatus(PaymentStatus.NotBilled);
        }
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", unitsConsumed=" + unitsConsumed +
                ", paymentStatus=" + paymentStatus +
                ", billAmount=" + billAmount +
                ", billingDate=" + billingDate +
                ", paymentDueDate=" + paymentDueDate +
                ", customer=" + customer +
                ", tariff=" + tariff +
                '}';
    }
}