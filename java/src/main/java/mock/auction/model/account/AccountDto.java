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
    private Integer account_id;
    private boolean is_personal_or_agency;
    private String email;
    private String password;
    private String fullname;
    private String phone;
    private char gender;
    private int age;
    private Integer location_id;
    private LocationDto location;
    private String career;
    private int count_spam;
    private String status;
    private Boolean del_flag;
    private List<Integer> role_ids;
    private Set<RoleDto> roles;
}
