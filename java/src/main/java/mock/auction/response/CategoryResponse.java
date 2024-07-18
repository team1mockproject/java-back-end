package mock.auction.response;

import java.util.List;

import lombok.*;
import mock.auction.entity.Asset;
import mock.auction.entity.CategoryAsset;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Integer categoryAssetId;
    private String name;
    private String description;
    List<String> assetNames;

    public CategoryResponse(CategoryAsset categoryAsset) {
        this.categoryAssetId = categoryAsset.getCategoryAssetId();
        this.name = categoryAsset.getName();
        this.description = categoryAsset.getDescription();
        this.assetNames = categoryAsset.getAssets().stream().map(Asset::getAssetName).toList();
    }

    public static CategoryResponse fromCategoryAsset(CategoryAsset categoryAsset) {
        return new CategoryResponse(categoryAsset);
    }

}
