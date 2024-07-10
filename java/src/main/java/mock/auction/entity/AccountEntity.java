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
    @Column(name = "account_id")
    private int id;
    @Column(name = "is_personal_or_agency")
    private boolean personalOrAgency;
    private String email;
    @Column(name = "password")
    private String passWord;
    @Column(name="fullname")
    private String fullName;
    private String phone;
    private char gender;
    private int age;
    @ManyToOne
    @JoinColumn(name="location_id")
    private LocationEntity location;
    private String career;
    @Column(name = "count_spam")
    private int countSpam;
    private String status;
    @Column(name = "del_flag")
    private boolean delFlag;
    @ManyToMany
    @JoinTable(
            name = "RoleAccount",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<RoleEntity> roles;
}
