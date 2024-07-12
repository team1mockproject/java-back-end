package com.mockproject.auction.entity;

import java.io.Serializable;

public class AuctionFeeId implements Serializable {

    private Long auctionId;
    private Long feeId;

    public AuctionFeeId(Long auctionId, Long feeId) {
        this.auctionId = auctionId;
        this.feeId = feeId;
    }
}
