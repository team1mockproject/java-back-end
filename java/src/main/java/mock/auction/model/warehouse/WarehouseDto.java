package mock.auction.model.warehouse;

import lombok.Getter;
import lombok.Setter;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.location.LocationDto;

import java.util.Collection;

@Getter
@Setter
public class WarehouseDto {
    private int warehouseId;
    private String name;
    private LocationDto location;
    private Collection<AssetDto> assets;
}
