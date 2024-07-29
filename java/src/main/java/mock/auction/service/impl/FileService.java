package mock.auction.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import lombok.RequiredArgsConstructor;

/**
 * FileService
 * 
 * Version 1.0
 * 
 * Date: 22-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * 22-07-2024   kiet-kun-afk    Create
 */
@Service
@RequiredArgsConstructor
public class FileService {

    public List<String> saveLocalFiles(List<MultipartFile> images) throws Exception {
        if (images == null || images.isEmpty()) {
            return null;
        }
        List<String> imagePaths = new ArrayList<>();

        for (MultipartFile image : images) {

            if (!isImageFile(image) || image.getOriginalFilename() == null) {
                throw new IOException("Invalid image format");
            }

            String directory = "images/";
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(directory, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, image.getBytes());
            imagePaths.add(fileName);
        }
        return imagePaths;
    }

    public String saveLocalFile(MultipartFile image) throws Exception {
        if (image == null || image.isEmpty()) {
            return null;
        }
        if (!isImageFile(image) || image.getOriginalFilename() == null) {
            throw new IOException("Invalid image format");
        }

        String directory = "image/";
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(directory, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, image.getBytes());
        return fileName;
    }

    public boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    private String uploadFile(File file, String fileName) throws Exception {
        BlobId blobId = BlobId.of("mockproject-f2ac7.appspot.com", fileName); // Replace with your bucker name
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        InputStream inputStream = FileService.class.getClassLoader().getResourceAsStream("firebase-private-key.json");
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));

        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/mockproject-f2ac7.appspot.com/o/%s?alt=media";
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws Exception {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public String upload(MultipartFile multipartFile) {
        try {
            // to get original file name
            String fileName = multipartFile.getOriginalFilename();

            // to generated random string values for file name.
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName); // to convert multipartFile to File
            String URL = this.uploadFile(file, fileName); // to get uploaded file link
            file.delete();
            return URL;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> uploadMulti(List<MultipartFile> multipartFiles) {
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            return null;
        }
        try {
            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile multipartFile : multipartFiles) {
                // to get original file name
                String fileName = multipartFile.getOriginalFilename();

                // to generated random string values for file name.
                fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

                File file = this.convertToFile(multipartFile, fileName); // to convert multipartFile to File
                String URL = this.uploadFile(file, fileName); // to get uploaded file link
                file.delete();
                imagePaths.add(URL);
            }
            return imagePaths;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
