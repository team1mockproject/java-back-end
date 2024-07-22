package mock.auction.request;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * AssetRequest
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
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetRequest {
    @NotBlank(message = "Asset name is required")
    private String assetName;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Origin is required")
    private String origin;
    @NotNull(message = "Market price is required")
    @Positive(message = "Market price must not be negative")
    private Double marketPrice;
    @NotBlank(message = "Legal status is required")
    private String legalStatus;
    @NotNull(message = "Category id is required")
    private Integer categoryAssetId;
    @NotNull(message = "Assessor id is required")
    private Integer assessorId;
    @NotNull(message = "Ware house is required")
    private Integer warehouseId;
    @NotNull(message = "Assessment date is required")
    @Past(message = "Assessment date is in the past")
    private LocalDateTime assessmentDate;
    private MultipartFile assessmentReport;
    private List<MultipartFile> images;
}
