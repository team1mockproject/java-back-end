package com.mockproject.auction.entity;

import java.io.Serializable;

public class WatchlistId implements Serializable {

    private Long buyerId;
    private Long assetId;

    public WatchlistId(Long buyerId, Long assetId) {
        this.buyerId = buyerId;
        this.assetId = assetId;
    }
}
