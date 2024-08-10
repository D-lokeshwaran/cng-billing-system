package com.cng_billing_system.core_api.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

@Getter
@Setter
@Embeddable
public class UnitsAndRate {

    private Integer fromUnit;

    private String toUnit;

    private String ratePerUnit;

    @Override
    public String toString() {
        return "UnitsAndRate{" +
                "fromUnit=" + fromUnit +
                ", toUnit='" + toUnit + '\'' +
                ", ratePerUnit=" + ratePerUnit +
                '}';
    }
}