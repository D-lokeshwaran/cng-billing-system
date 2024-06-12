package com.cng_billing_system.core_api.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Embeddable
public class UnitsAndRate {

    @Column(precision = 6, scale = 2)
    private BigDecimal fromUnit;

    @Column(precision = 6, scale = 2)
    private String toUnit;

    private BigDecimal ratePerUnit;

}