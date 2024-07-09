package com.mockproject.auction.entity;

import jakarta.persistence.*;


import java.sql.Date;
import java.util.Collection;

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

    public AccountEntity() {
    }

    public AccountEntity(boolean personalOrAgency, String email, String passWord, String fullName, String phone, char gender, int age, LocationEntity location, Date dateOfBirth, String career, int countSpam, String status, boolean delFlag, Collection<RoleEntity> roles) {
        this.personalOrAgency = personalOrAgency;
        this.email = email;
        this.passWord = passWord;
        this.fullName = fullName;
        this.phone = phone;
        this.gender = gender;
        this.age = age;
        this.location = location;
        this.dateOfBirth = dateOfBirth;
        this.career = career;
        this.countSpam = countSpam;
        this.status = status;
        this.delFlag = delFlag;
        this.roles = roles;
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
