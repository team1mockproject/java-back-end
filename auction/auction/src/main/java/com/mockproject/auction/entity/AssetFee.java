package com.mockproject.auction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AssetFee")
@IdClass(AssetFeeId.class)
public class AssetFee {
    @Id
    @Column(name = "asset_id")
    private Long assetId;
    @Id
    @Column(name = "fee_id")
    private Long feeId;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "asset_id", insertable = false, updatable = false)
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "fee_id", insertable = false, updatable = false)
    private Fee fee;

    public AssetFee() {
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public Long getFeeId() {
        return feeId;
    }

    public void setFeeId(Long feeId) {
        this.feeId = feeId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public Fee getFee() {
        return fee;
    }

    public void setFee(Fee fee) {
        this.fee = fee;
    }
}
