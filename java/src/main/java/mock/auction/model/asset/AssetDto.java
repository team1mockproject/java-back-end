package mock.auction.model.asset;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import mock.auction.model.account.AccountDto;
import mock.auction.model.assessor.AssessorDto;
import mock.auction.model.categoryasset.CategoryAssetDto;
import mock.auction.model.warehouse.WarehouseDto;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AssetDto {
    private Integer assetId;
    private CategoryAssetDto categoryAsset;
    private String assetName;
    private String description;
    private String assetStatus;
    private String origin;
    private Double marketPrice;
    private LocalDateTime listingDate;
    private String legalStatus;
    private AssessorDto assessor;
    private LocalDateTime assessmentDate;
    private String assessmentReport;
    private WarehouseDto warehouse;
    private String shippingStatus;
    private boolean delFlag;
    private Integer categoryAssetId;
    private Integer accountId;
    private Integer assessorId;
    private Integer warehouseId;
    private List<String> urls;
    private List<AssetFileDto> assetFiles;
    private List<AssetFeeDto> assetFees;
    private AccountDto seller;
}
