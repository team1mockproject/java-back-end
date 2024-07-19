package mock.auction.model.assessor;

import lombok.Getter;
import lombok.Setter;
import mock.auction.model.location.LocationDto;

import java.util.Collection;

@Getter
@Setter
public class AssessorDto {
    private Integer assessorId;
    private LocationDto location;
    private String email;
    private String phone;
    private Collection<AssessorDto> assets;
}
