package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Account")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int account_id;
    private boolean is_personal_or_agency;
    private String email;
    private String password;
    private String fullname;
    private String phone;
    private char gender;
    private int age;
    @ManyToOne
    @JoinColumn(name="location_id")
    private LocationEntity location;
    private String career;
    private int count_spam;
    private String status;
    private boolean del_flag;
    @ManyToMany
    @JoinTable(
            name = "RoleAccount",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<RoleEntity> roles;
}
