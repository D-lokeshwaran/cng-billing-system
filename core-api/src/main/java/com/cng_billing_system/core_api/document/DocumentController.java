package com.cng_billing_system.core_api.document;

import com.cng_billing_system.core_api.fileStorage.StorageService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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

    @GetMapping()
    public List<Document> retrieveAllDocuments() {
        return documentRepository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadDocument(
            @RequestParam String fileName,
            @RequestParam MultipartFile file
    ) {
        storageService.uploadFile(file.getOriginalFilename(), file);
        Document document = new Document(fileName, file.getOriginalFilename());
        documentRepository.save(document);

        URI documentLocation = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(document.getId())
                .toUri();
        return ResponseEntity.created(documentLocation).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> retrieveDocument(@PathVariable Long id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            Resource file = storageService.downloadFile(document.get().getDocument());
            if (file != null) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            documentRepository.deleteById(id);
            storageService.deleteFile(document.get().getDocument());
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
            storageService.deleteFile(document.getDocument());
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
                .map(Document::getDocument)
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
