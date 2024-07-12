package com.mockproject.auction.entity;

import jakarta.persistence.*;


import java.sql.Date;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Account")
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
    private Date dateOfBirth;
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
    public AccountEntity() {
    }

    public List<Asset> getSellingAssets() {
        return sellingAssets;
    }

    public void setSellingAssets(List<Asset> sellingAssets) {
        this.sellingAssets = sellingAssets;
    }

    public List<Auction> getWonAuctions() {
        return wonAuctions;
    }

    public void setWonAuctions(List<Auction> wonAuctions) {
        this.wonAuctions = wonAuctions;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }

    public List<BidHistory> getBidHistories() {
        return bidHistories;
    }

    public void setBidHistories(List<BidHistory> bidHistories) {
        this.bidHistories = bidHistories;
    }

    public List<CustomerSupport> getCustomerSupports() {
        return customerSupports;
    }

    public void setCustomerSupports(List<CustomerSupport> customerSupports) {
        this.customerSupports = customerSupports;
    }

    public List<CustomerSupport> getStaffSupports() {
        return staffSupports;
    }

    public void setStaffSupports(List<CustomerSupport> staffSupports) {
        this.staffSupports = staffSupports;
    }

    public List<RegistParticipateAuction> getRegistParticipateAuctions() {
        return registParticipateAuctions;
    }

    public void setRegistParticipateAuctions(List<RegistParticipateAuction> registParticipateAuctions) {
        this.registParticipateAuctions = registParticipateAuctions;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isPersonalOrAgency() {
        return personalOrAgency;
    }

    public void setPersonalOrAgency(boolean personalOrAgency) {
        this.personalOrAgency = personalOrAgency;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public LocationEntity getLocation() {
        return location;
    }

    public void setLocation(LocationEntity location) {
        this.location = location;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public int getCountSpam() {
        return countSpam;
    }

    public void setCountSpam(int countSpam) {
        this.countSpam = countSpam;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isDelFlag() {
        return delFlag;
    }

    public void setDelFlag(boolean delFlag) {
        this.delFlag = delFlag;
    }

    public Collection<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Collection<RoleEntity> roles) {
        this.roles = roles;
    }
}
