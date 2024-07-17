package mock.auction.response;

import lombok.*;
import mock.auction.entity.Assessor;
import mock.auction.entity.LocationEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssessorResponse {
    private String name;
    private LocationEntity location;
    private String email;
    private String phone;
    private String province;
    private String city;
    private String address;

    public AssessorResponse(Assessor assessor) {
        this.name = assessor.getName();
        this.email = assessor.getEmail();
        this.phone = assessor.getPhone();
        this.province = assessor.getLocation().getProvince();
        this.city = assessor.getLocation().getCity();
        this.address = assessor.getLocation().getAddress();
    }

    public static AssessorResponse fromAssessor(Assessor assessorEntity) {
        return new AssessorResponse(assessorEntity);
    }
}
