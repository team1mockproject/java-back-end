package com.mockproject.auction.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Auction")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_id")
    private Long auctionId;
    @Column(name = "start_date")
    private LocalDateTime startDate;
    @Column(name = "end_date")
    private LocalDateTime endDate;
    private String conductor;
    @Column(name = "starting_price")
    private Double startingPrice;
    @Column(name = "min_price_increase")
    private Double minPriceIncrease;
    private String period;
    @Column(name = "highest_price")
    private Double highestPrice;
    @Column(name = "auction_status")
    private String auctionStatus;
    @Column(name = "payment_status")
    private String paymentStatus;
    @Column(name = "payment_date")
    private Date paymentDate;
    @Column(name = "payment_amount")
    private Double paymentAmount;
    @Column(name = "payment_method")
    private String paymentMethod;
    @Column(name = "del_flag")
    private Boolean delFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    @JsonIgnore
    private Asset asset;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_type_id")
    private AuctionType auctionType;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "winner_id")
    @JsonIgnore
    private AccountEntity winner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_event_id")
    @JsonIgnore
    private AuctionEvent auctionEvent;

    @OneToMany(mappedBy = "auction",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<BidHistory> bidHistories;
    @OneToMany(mappedBy = "auction",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<RegistParticipateAuction> registParticipateAuctions;
    @OneToMany(mappedBy = "auction",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AuctionFee> auctionFees;

    public Auction() {
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getConductor() {
        return conductor;
    }

    public void setConductor(String conductor) {
        this.conductor = conductor;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Double getMinPriceIncrease() {
        return minPriceIncrease;
    }

    public void setMinPriceIncrease(Double minPriceIncrease) {
        this.minPriceIncrease = minPriceIncrease;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Double getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(Double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public String getAuctionStatus() {
        return auctionStatus;
    }

    public void setAuctionStatus(String auctionStatus) {
        this.auctionStatus = auctionStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Double getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Boolean getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public AuctionType getAuctionType() {
        return auctionType;
    }

    public void setAuctionType(AuctionType auctionType) {
        this.auctionType = auctionType;
    }

    public AccountEntity getWinner() {
        return winner;
    }

    public void setWinner(AccountEntity winner) {
        this.winner = winner;
    }

    public AuctionEvent getAuctionEvent() {
        return auctionEvent;
    }

    public void setAuctionEvent(AuctionEvent auctionEvent) {
        this.auctionEvent = auctionEvent;
    }

    public List<BidHistory> getBidHistories() {
        return bidHistories;
    }

    public void setBidHistories(List<BidHistory> bidHistories) {
        this.bidHistories = bidHistories;
    }

    public List<RegistParticipateAuction> getRegistParticipateAuctions() {
        return registParticipateAuctions;
    }

    public void setRegistParticipateAuctions(List<RegistParticipateAuction> registParticipateAuctions) {
        this.registParticipateAuctions = registParticipateAuctions;
    }

    public List<AuctionFee> getAuctionFees() {
        return auctionFees;
    }

    public void setAuctionFees(List<AuctionFee> auctionFees) {
        this.auctionFees = auctionFees;
    }
}