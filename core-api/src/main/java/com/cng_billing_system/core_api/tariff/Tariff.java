package com.cng_billing_system.core_api.tariff;

import com.cng_billing_system.core_api.bill.Bill;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
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

    public Date fromDate;

    public Date toDate;

    @ElementCollection
    private List<UnitsAndRate> unitsAndRates;

    @OneToMany(mappedBy = "tariff")
    private List<Bill> bills;

}
