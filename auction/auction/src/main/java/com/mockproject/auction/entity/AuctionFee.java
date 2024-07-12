package com.mockproject.auction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AuctionFee")
@IdClass(AuctionFeeId.class)
public class AuctionFee {
    @Id
    @Column(name = "auction_id")
    private Integer auctionId;
    @Id
    @Column(name = "fee_id")
    private Integer feeId;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "auction_id", insertable = false, updatable = false)
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "fee_id", insertable = false, updatable = false)
    private Fee fee;

    public AuctionFee() {
    }

    public Integer getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Integer auctionId) {
        this.auctionId = auctionId;
    }

    public Integer getFeeId() {
        return feeId;
    }

    public void setFeeId(Integer feeId) {
        this.feeId = feeId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public Fee getFee() {
        return fee;
    }

    public void setFee(Fee fee) {
        this.fee = fee;
    }
}

