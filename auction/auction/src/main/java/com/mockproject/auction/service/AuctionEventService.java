package com.mockproject.auction.service;

import com.mockproject.auction.entity.AccountEntity;
import com.mockproject.auction.entity.AuctionEvent;

import java.util.List;
import java.util.Set;

public interface AuctionEventService {

    public AuctionEvent addAuctionEvent(AuctionEvent auctionEvent);

    public AuctionEvent updateAuctionEvent(Long id, AuctionEvent auctionEvent);

    public void deleteAuctionEvent(Long id);

    public List<AuctionEvent> geyAllAuctionEvent();

    public List<AuctionEvent> searchAuctionEvent(String keyword);

    public List<AuctionEvent> filterAuctionEvent(String status);
}
