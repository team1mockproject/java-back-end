package com.mockproject.auction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "RegistParticipateAuction")
@IdClass(RegistParticipateAuctionId.class)
public class RegistParticipateAuction {
    @Id
    @Column(name = "auction_id")
    private Long auctionId;
    @Id
    @Column(name = "account_id")
    private Integer accountId;

    private String payment;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "auction_id", insertable = false, updatable = false)
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private AccountEntity account;

    public RegistParticipateAuction() {
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
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

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }
}

