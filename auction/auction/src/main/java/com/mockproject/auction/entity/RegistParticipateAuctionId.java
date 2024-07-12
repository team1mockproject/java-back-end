package com.mockproject.auction.entity;

import java.io.Serializable;

public class RegistParticipateAuctionId implements Serializable {
    private Long auctionId;
    private Long accountId;

    public RegistParticipateAuctionId(Long auctionId, Long accountId) {
        this.auctionId = auctionId;
        this.accountId = accountId;
    }
}
