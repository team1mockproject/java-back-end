package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "AuctionType")
public class AuctionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_type_id")
    private Long auctionTypeId;
    private String name;
    @Column(name = "del_flag")
    private Boolean delFlag;
    @OneToMany(mappedBy = "auctionType")
    private List<Auction> auctions;
    public AuctionType() {
    }

    public List<Auction> getAuctions() {
        return auctions;
    }

    public void setAuctions(List<Auction> auctions) {
        this.auctions = auctions;
    }

    public Long getAuctionTypeId() {
        return auctionTypeId;
    }

    public void setAuctionTypeId(Long auctionTypeId) {
        this.auctionTypeId = auctionTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }
}
