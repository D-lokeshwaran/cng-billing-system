package com.cng_billing_system.core_api.document;

import com.cng_billing_system.core_api.customer.Customer;
import com.cng_billing_system.core_api.customer.CustomerRepository;
import com.cng_billing_system.core_api.fileStorage.StorageException;
import com.cng_billing_system.core_api.fileStorage.StorageService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/cng/documents")
public class DocumentController {

    private final StorageService storageService;

    private final DocumentRepository documentRepository;

    private final CustomerRepository customerRepository;

    @GetMapping()
    public List<Document> retrieveAllDocuments() {
        return documentRepository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadDocument(
            @RequestParam MultipartFile file,
            @RequestParam Long customerId
        ) {
        try {

            storageService.uploadFile(file.getOriginalFilename(), file);
            Customer customer = customerRepository.findById(customerId).orElse(null);
            Document document = new Document(file.getOriginalFilename(), file.getSize(), customer);
            documentRepository.save(document);

            URI documentLocation = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(document.getId())
                    .toUri();
            return ResponseEntity.created(documentLocation).build();

        } catch (StorageException storeEx) {
            storeEx.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(storeEx.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> retrieveDocument(@PathVariable Long id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            Resource file = storageService.downloadFile(document.get().getName());
            if (file != null) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{customerId}")
    public List<Document> retrieveDocumentsByCustomerId(@PathVariable Long customerId) {
        return documentRepository.findAllByCustomerId(customerId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            documentRepository.deleteById(id);
            storageService.deleteFile(document.get().getName());
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/bulk-delete")
    public String deleteBulkDocuments(@RequestBody Map<String, Object> body) {
        List<Long> ids = (List<Long>) body.get("ids");
        List<Long> deletedIds = new ArrayList<>();

        List<Document> documents = documentRepository.findAllByIdIn(ids);
        for (Document document : documents) {
            storageService.deleteFile(document.getName());
            documentRepository.deleteById(document.getId());
            deletedIds.add(document.getId());
        }

        return "Deleted ids: " + deletedIds;
    }

    @PostMapping("/bulk-download")
    public void retrieveBulkDocuments(@RequestBody Map<String, Object> body,
                                      HttpServletResponse response) {
        List<Long> ids = (List<Long>) body.get("ids");
        List<Document> documents = documentRepository.findAllByIdIn(ids);
        List<String> fileNames = documents.stream()
                .map(Document::getName)
                .toList();

        if (!fileNames.isEmpty()) {
            try {
                storageService.bulkDownload(fileNames, response.getOutputStream());
            } catch (IOException e) {
                throw new RuntimeException(e);
            };
        }
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + "downloadZip/attachments_d.zip" + "\"");
    }

}