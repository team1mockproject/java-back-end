package mock.auction.response;

import lombok.*;
import mock.auction.entity.CategoryAsset;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Integer categoryAssetId;
    private String name;
    private String description;

    public CategoryResponse(CategoryAsset categoryAsset) {
        this.categoryAssetId = categoryAsset.getCategoryAssetId();
        this.name = categoryAsset.getName();
        this.description = categoryAsset.getDescription();
    }

    public static CategoryResponse fromCategoryAsset(CategoryAsset categoryAsset) {
        return new CategoryResponse(categoryAsset);
    }

}
