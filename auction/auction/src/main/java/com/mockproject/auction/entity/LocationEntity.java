package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "Location")
public class LocationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private int locationId;
    private String province;
    private String city;
    private String address;
    @Column(name = "zip_code")
    private String zipCode;
    @OneToMany(mappedBy="location")
    private Collection<AccountEntity> accountEntities;
    @OneToMany(mappedBy = "location")
    private Collection<Warehouse> warehouses;
    @OneToMany(mappedBy = "location")
    private Collection<Assessor> assessors;
    @OneToMany(mappedBy = "location")
    private Collection<AuctionEvent> auctionEvents;

    public LocationEntity() {
    }

    public LocationEntity(String province, String city, String address, String zipCode, Collection<AccountEntity> accountEntities) {
        this.province = province;
        this.city = city;
        this.address = address;
        this.zipCode = zipCode;
        this.accountEntities = accountEntities;
    }

    public Collection<Warehouse> getWarehouses() {
        return warehouses;
    }

    public void setWarehouses(Collection<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }

    public Collection<Assessor> getAssessors() {
        return assessors;
    }

    public void setAssessors(Collection<Assessor> assessors) {
        this.assessors = assessors;
    }

    public Collection<AuctionEvent> getAuctionEvents() {
        return auctionEvents;
    }

    public void setAuctionEvents(Collection<AuctionEvent> auctionEvents) {
        this.auctionEvents = auctionEvents;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Collection<AccountEntity> getAccountEntities() {
        return accountEntities;
    }

    public void setAccountEntities(Collection<AccountEntity> accountEntities) {
        this.accountEntities = accountEntities;
    }
}
