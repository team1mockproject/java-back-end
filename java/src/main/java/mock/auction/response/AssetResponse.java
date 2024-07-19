package mock.auction.response;

import lombok.Data;
import mock.auction.entity.Asset;

@Data
public class AssetResponse {

    private String name;

    private String marketPrice;

    public AssetResponse(Asset asset) {
        this.name = asset.getAssetName();
        this.marketPrice = asset.getMarketPrice().toString();
    }

    public static AssetResponse of(Asset asset) {
        return new AssetResponse(asset);
    }
}
