package com.cng_billing_system.core_api.fileStorage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.SocketException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class FileStorageService implements StorageService {

    private final Path basePath;

    @Autowired
    public FileStorageService(@Value("${storage.location}") String location) {
        if (location.length() == 0) {
            throw new StorageException("Storage location can't be Empty.");
        }
        this.basePath = Paths.get(location);
    }


    @Override
    public Stream<Path> fileList() {
        try (Stream<Path> filesInBasePath = Files.walk(basePath, 1)) {
            return filesInBasePath
                    .filter(path -> !path.equals(basePath))
                    .map(basePath::relativize);
        } catch (IOException iox) {
            throw new StorageException(iox.getMessage());
        }
    }

    @Override
    public void uploadFile(String fileName, MultipartFile multipartFile) {
        try {
            if (multipartFile.isEmpty()) {
                throw new SocketException("Failed to upload empty file.");
            }
            Path targetPath = Path.of(basePath +"/"+ fileName);

            try (InputStream fileStream = multipartFile.getInputStream()) {
                long ld = Files.copy(fileStream, targetPath,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException iox) {
            iox.printStackTrace();
        }
    }

    @Override
    public Resource downloadFile(String fileName) {
        try {
            Path file = basePath.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageException("Could not read file: " + fileName);
            }
        } catch (IOException iox) {
            iox.printStackTrace();
        }
        return null;
    }

    @Override
    public void bulkDownload(List<String> fileNames, OutputStream resOut) {
        Iterator<String> itr = fileNames.iterator();
        try {
            ZipOutputStream zipOut = new ZipOutputStream(resOut);
            while (itr.hasNext()) {
                String fileName = itr.next();
                FileSystemResource resource = new FileSystemResource(basePath +"/"+ fileName);
                ZipEntry zipEntry = new ZipEntry(Objects.requireNonNull(resource.getFilename()));
                zipEntry.setSize(resource.contentLength());
                zipOut.putNextEntry(zipEntry);
                StreamUtils.copy(resource.getInputStream(), zipOut);
                zipOut.closeEntry();
            }
            zipOut.finish();
            zipOut.close();
        } catch (IOException iox) {
            iox.printStackTrace();
        }
    }

    @Override
    public void deleteFile(String fileName) {
        try {
            Path path = basePath.resolve(fileName);
            FileSystemUtils.deleteRecursively(path);
        } catch (IOException iox) {
            iox.printStackTrace();
        }
    }


}
