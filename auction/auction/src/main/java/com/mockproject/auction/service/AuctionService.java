package com.mockproject.auction.service;

import com.mockproject.auction.entity.Auction;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


public interface AuctionService {
    public Auction addAuction(Auction auction);
    public Auction updateAuction(Long id,Auction auction);
    public void deleteAuction(Long id);
    public List<Auction> getAllAuction();
    public List<Auction> searchAuction(String keyword);
    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, double minPrice, double maxPrice);
}
