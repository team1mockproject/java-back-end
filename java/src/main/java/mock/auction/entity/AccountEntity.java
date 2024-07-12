package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

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
    @Column(name = "fullname")
    private String fullName;
    private String phone;
    private char gender;
    private int age;
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
    @ManyToMany
    @JoinTable(name = "RoleAccount", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<RoleEntity> roles;
    @OneToMany(mappedBy = "seller")
    private List<Asset> sellingAssets;
    @OneToMany(mappedBy = "winner")
    private List<Auction> wonAuctions;
    @OneToMany(mappedBy = "account")
    private List<Notification> notifications;
    @OneToMany(mappedBy = "buyer")
    private List<Watchlist> watchlists;
    @OneToMany(mappedBy = "account")
    private List<BidHistory> bidHistories;
    @OneToMany(mappedBy = "customer")
    private List<CustomerSupport> customerSupports;
    @OneToMany(mappedBy = "staff")
    private List<CustomerSupport> staffSupports;
    @OneToMany(mappedBy = "account")
    private List<RegistParticipateAuction> registParticipateAuctions;
}
