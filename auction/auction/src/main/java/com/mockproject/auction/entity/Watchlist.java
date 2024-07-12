package com.mockproject.auction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Watchlist")
@IdClass(WatchlistId.class)
public class Watchlist {
    @Id
    @Column(name = "buyer_id")
    private Long buyerId;
    @Id
    @Column(name = "asset_id")
    private Long assetId;

    @ManyToOne
    @JoinColumn(name = "buyer_id", insertable = false, updatable = false)
    private AccountEntity buyer;

    @ManyToOne
    @JoinColumn(name = "asset_id", insertable = false, updatable = false)
    private Asset asset;

    public Watchlist() {
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public AccountEntity getBuyer() {
        return buyer;
    }

    public void setBuyer(AccountEntity buyer) {
        this.buyer = buyer;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }
}
