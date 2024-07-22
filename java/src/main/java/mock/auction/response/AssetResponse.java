package mock.auction.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import mock.auction.entity.Asset;
import mock.auction.entity.AssetFile;

/**
 * AssetResponse
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
 * 22-07-2024   kiet-kun-afk    Update
 */
@Data
public class AssetResponse {

    private Integer assetId;

    private String name;

    private String description;

    private String assetStatus;

    private String origin;

    private String marketPrice;

    private LocalDateTime listingDate;

    private String sellerName;

    private String legalStatus;

    private String assessorName;

    private LocalDateTime assessmentDate;

    private Integer warehouseId;

    private List<String> photUrl;

    private String assessmentReport;

    private Boolean delFlag;

    public AssetResponse(Asset asset) {
        this.assetId = asset.getAssetId();
        this.name = asset.getAssetName();
        this.description = asset.getDescription();
        this.assetStatus = asset.getAssetStatus();
        this.origin = asset.getOrigin();
        this.marketPrice = asset.getMarketPrice().toString();
        this.listingDate = asset.getListingDate();
        this.sellerName = asset.getSeller() == null ? null : asset.getSeller().getFullName();
        this.legalStatus = asset.getLegalStatus();
        this.assessorName = asset.getAssessor().getName();
        this.assessmentDate = asset.getAssessmentDate();
        this.warehouseId = asset.getWarehouse().getWarehouseId();
        this.photUrl = asset.getAssetFiles().stream().map(AssetFile::getUrl).toList();
        this.assessmentReport = asset.getAssessmentReport();
        this.delFlag = asset.getDelFlag();
    }

    public static AssetResponse of(Asset asset) {
        return new AssetResponse(asset);
    }
}
