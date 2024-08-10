package com.cng_billing_system.core_api.activityLog;

import com.cng_billing_system.core_api.audit.AuditModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class ActivityLog extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String entityName;

    private String changes;

    private String referKeys;

    public ActivityLog() {
    }

    public ActivityLog(String action, String entityName) {
        this.action = action;
        this.entityName = entityName;
    }

    @Override
    public String toString() {
        return "ActivityLog{" +
                "id=" + id +
                ", action='" + action + '\'' +
                ", entityName='" + entityName + '\'' +
                ", changes='" + changes + '\'' +
                ", referKeys='" + referKeys + '\'' +
                '}';
    }
}
