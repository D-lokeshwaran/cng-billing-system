package com.cng_billing_system.core_api.fileStorage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.OutputStream;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface StorageService {

    Stream<Path> fileList();

    void uploadFile(String fileName, MultipartFile multipartFile);

    Resource downloadFile(String fileName);

    void bulkDownload(List<String> fileNames, OutputStream resOut);

    void deleteFile(String fileName);

}
