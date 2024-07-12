package com.mockproject.auction.service.impl;

import com.mockproject.auction.entity.Auction;
import com.mockproject.auction.entity.AuctionType;
import com.mockproject.auction.repository.AuctionRepository;
import com.mockproject.auction.repository.AuctionTypeRepository;
import com.mockproject.auction.service.AuctionService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {
    private AuctionRepository auctionRepository;
    private AuctionTypeRepository auctionTypeRepository;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, AuctionTypeRepository auctionTypeRepository) {
        this.auctionRepository = auctionRepository;
        this.auctionTypeRepository = auctionTypeRepository;
    }

    @Override
    @Transactional
    public Auction addAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    @Override
    @Transactional
    public Auction updateAuction(Long id, Auction auction) {
        Optional<Auction> existAuction = auctionRepository.findById(id);
        if(existAuction.isPresent()){
            return auctionRepository.saveAndFlush(auction);
        }else {
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteAuction(Long id) {
        if(auctionRepository.findById(id).isPresent()){
            auctionRepository.deleteById(id);
        }else{

        }
    }

    @Override
    public List<Auction> getAllAuction() {
        return auctionRepository.findAll();
    }

    @Override
    public List<Auction> searchAuction(String keyword) {
        return auctionRepository.findByAsset_AssetName(keyword);
    }

    @Override
    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, double minPrice, double maxPrice) {
        return auctionRepository.findAuctionsByDateRangeAndAmount(startDate,endDate,minPrice,maxPrice);
    }
}
