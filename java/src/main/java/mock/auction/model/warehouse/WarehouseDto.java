package mock.auction.model.warehouse;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.location.LocationDto;

import java.io.FileInputStream;
import java.util.Collection;

@Getter
@Setter
public class WarehouseDto {
    private int warehouseId;
    private String name;
    private LocationDto location;
//    @JsonManagedReference
//    private Collection<AssetDto> assets;
}
