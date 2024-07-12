package com.mockproject.auction.entity;

import java.io.Serializable;

public class AssetFeeId implements Serializable {

    private Long assetId;
    private Long feeId;

    public AssetFeeId(Long assetId, Long feeId) {
        this.assetId = assetId;
        this.feeId = feeId;
    }
}
