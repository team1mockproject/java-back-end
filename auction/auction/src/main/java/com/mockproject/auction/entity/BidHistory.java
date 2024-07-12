package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "BidHistory")
public class BidHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_history_id")
    private Long bidHistoryId;
    @Column(name = "bid_date")
    private Date bidDate;
    @Column(name = "bid_amount")
    private double bidAmount;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    public BidHistory() {
    }

    public Long getBidHistoryId() {
        return bidHistoryId;
    }

    public void setBidHistoryId(Long bidHistoryId) {
        this.bidHistoryId = bidHistoryId;
    }

    public Date getBidDate() {
        return bidDate;
    }

    public void setBidDate(Date bidDate) {
        this.bidDate = bidDate;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }
}
