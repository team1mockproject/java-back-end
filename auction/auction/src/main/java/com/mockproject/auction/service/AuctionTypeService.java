package com.mockproject.auction.service;

import com.mockproject.auction.entity.AuctionType;

import java.util.List;
import java.util.Optional;

public interface AuctionTypeService {

    public AuctionType addAuctionType(AuctionType auctionType);
    public AuctionType updateAuctionType(Long id, AuctionType auctionType);
    public void deleteAuctionType(Long id);
    public List<AuctionType> getAllAuctionType();
    public Optional<AuctionType> getAuctionTypeById(Long id);
}
