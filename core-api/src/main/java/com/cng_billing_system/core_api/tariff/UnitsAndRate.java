package com.cng_billing_system.core_api.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Embeddable
public class UnitsAndRate {

    private Integer fromUnit;

    private String toUnit;

    private BigDecimal ratePerUnit;

}