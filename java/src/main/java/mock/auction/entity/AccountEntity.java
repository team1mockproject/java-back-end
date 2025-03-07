package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Integer id;
    @Column(name = "is_personal_or_agency")
    private boolean personalOrAgency;
    private String email;
    @Column(name = "password")
    private String passWord;
    @Column(name = "fullname")
    private String fullName;
    private String phone;
    private char gender;
    private int age;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private String career;
    @Column(name = "count_spam")
    private int countSpam;
    private String status;
    @Column(name = "del_flag")
    private boolean delFlag;
    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "RoleAccount", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<RoleEntity> roles;
    @JsonIgnore
    @OneToMany(mappedBy = "seller")
    private List<Asset> sellingAssets;
    @JsonIgnore
    @OneToMany(mappedBy = "winner")
    private List<Auction> wonAuctions;
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Notification> notifications;
    @JsonIgnore
    @OneToMany(mappedBy = "buyer")
    private List<Watchlist> watchlists;
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<BidHistory> bidHistories;
    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<CustomerSupport> customerSupports;
    @JsonIgnore
    @OneToMany(mappedBy = "staff")
    private List<CustomerSupport> staffSupports;
}
