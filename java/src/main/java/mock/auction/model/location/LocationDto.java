package mock.auction.model.location;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LocationDto {
    private int locationId;
    private String province;
    private String city;
    private String address;
    private String zipCode;
}
