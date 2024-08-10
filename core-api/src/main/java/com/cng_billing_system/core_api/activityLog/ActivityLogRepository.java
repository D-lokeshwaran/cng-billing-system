package com.cng_billing_system.core_api.activityLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "activityLogs", path = "activityLogs")
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}
