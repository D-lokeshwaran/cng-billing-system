package com.cng_billing_system.core_api.document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "documents", path = "documents")
public interface DocumentRepository extends JpaRepository<Document, Long> {

//    @Override
//    @RestResource(exported = false)
//    void deleteById(Long id); // customization example

}
