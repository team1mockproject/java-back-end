package mock.auction.model.account;

import lombok.Getter;
import lombok.Setter;
import mock.auction.model.location.LocationDto;
import mock.auction.model.role.RoleDto;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class AccountDto {
    private Integer id;
    private boolean personalOrAgency;
    private String email;
    private String passWord;
    private String fullName;
    private String phone;
    private char gender;
    private int age;
    private Integer locationId;
    private LocationDto location;
    private String career;
    private int countSpam;
    private String status;
    private Boolean delFlag;
    private List<Integer> roleIds;
    private Set<RoleDto> roles;
}
