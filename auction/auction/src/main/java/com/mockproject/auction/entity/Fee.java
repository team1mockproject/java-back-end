package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Fee")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fee_id")
    private Long feeId;
    private String name;
    private String content;
    @OneToMany(mappedBy = "fee")
    private List<AssetFee> assetFees;
    @OneToMany(mappedBy = "fee")
    private List<AuctionFee> auctionFees;
    public Fee() {
    }

    public List<AssetFee> getAssetFees() {
        return assetFees;
    }

    public void setAssetFees(List<AssetFee> assetFees) {
        this.assetFees = assetFees;
    }

    public List<AuctionFee> getAuctionFees() {
        return auctionFees;
    }

    public void setAuctionFees(List<AuctionFee> auctionFees) {
        this.auctionFees = auctionFees;
    }

    public Long getFeeId() {
        return feeId;
    }

    public void setFeeId(Long feeId) {
        this.feeId = feeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
