package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.audit.AuditModel;
import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.enums.PaymentStatus;
import com.cng_billing_system.core_api.tariff.Tariff;
import com.cng_billing_system.core_api.tariff.UnitsAndRate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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

    @Temporal(TemporalType.DATE)
    private Date billingDate;

    @Temporal(TemporalType.DATE)
    private Date paymentDueDate;

    @Transient
    private BigDecimal ratePerUnit;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    @JsonIgnore
    private Tariff tariff;

    @PrePersist
    @PreUpdate
    public void beforeSaveOrUpdate() {
        if (billAmount != null && paymentStatus == PaymentStatus.NotBilled) {
            setPaymentStatus(PaymentStatus.Pending);
        } else if (paymentStatus == null){
            setPaymentStatus(PaymentStatus.NotBilled);
        }

        // update rate per unit
        if (tariff != null) {
            List<UnitsAndRate> unitsAndRates = tariff.getUnitsAndRates();
            UnitsAndRate lastUnitsAndRate = unitsAndRates.get(unitsAndRates.size() - 1);
            if (unitsAndRates.get(unitsAndRates.size() -1).getFromUnit() < unitsConsumed) {
                setRatePerUnit(new BigDecimal(lastUnitsAndRate.getRatePerUnit()));
            } else {
                unitsAndRates.remove(unitsAndRates.size() -1);
                for (UnitsAndRate unitsAndRate : unitsAndRates) {
                    if (unitsAndRate.getFromUnit() <= unitsConsumed
                            || Integer.parseInt(unitsAndRate.getToUnit()) >= unitsConsumed) {
                        setRatePerUnit(new BigDecimal(unitsAndRate.getRatePerUnit()));
                    }
                }
            }
        }

        // Send Emails
        if (customer != null) {
            switch(paymentStatus) {
                case Pending -> BillEmailService.sendBillCreatedEmail(this);
                case Completed -> BillEmailService.sendMarkAsPaidEmail(this);
            }
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