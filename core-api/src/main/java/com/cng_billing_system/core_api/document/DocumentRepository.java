package com.cng_billing_system.core_api.document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findAllByIdIn(List<Long> ids);

    List<Document> findAllByCustomerId(Long id);

    void deleteByIdIn(List<Long> ids);

}
