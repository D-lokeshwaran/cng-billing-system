package com.cng_billing_system.core_api.tariff;

import com.cng_billing_system.core_api.bill.Bill;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tariffs")
@Getter
@Setter
public class Tariff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date fromDate;

    @Temporal(TemporalType.DATE)
    private Date toDate;

    @ElementCollection
    private List<UnitsAndRate> unitsAndRates;

    @OneToMany(mappedBy = "tariff")
    @JsonIgnore
    private List<Bill> bills = new ArrayList<>();

    @Transient
    private Integer numberOfBills = getBills().size();

}
