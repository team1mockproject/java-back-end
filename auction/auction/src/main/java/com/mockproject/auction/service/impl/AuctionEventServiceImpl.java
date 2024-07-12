package com.mockproject.auction.service.impl;

import com.mockproject.auction.entity.AccountEntity;
import com.mockproject.auction.entity.AuctionEvent;
import com.mockproject.auction.repository.AuctionEventRepository;
import com.mockproject.auction.service.AuctionEventService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionEventServiceImpl implements AuctionEventService {
    private AuctionEventRepository auctionEventRepository;

    @Autowired
    public AuctionEventServiceImpl(AuctionEventRepository auctionEventRepository) {
        this.auctionEventRepository = auctionEventRepository;
    }

    @Override
    @Transactional
    public AuctionEvent addAuctionEvent(AuctionEvent auctionEvent) {
        return auctionEventRepository.save(auctionEvent);
    }

    @Override
    @Transactional
    public AuctionEvent updateAuctionEvent(Long id, AuctionEvent auctionEvent) {
        Optional<AuctionEvent> auctionEvent1 = auctionEventRepository.findById(id);
        if(auctionEvent1.isPresent()){
            return auctionEventRepository.saveAndFlush(auctionEvent);
        }else{
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteAuctionEvent(Long id) {
        auctionEventRepository.deleteById(id);
    }

    @Override
    public List<AuctionEvent> geyAllAuctionEvent() {
        return auctionEventRepository.findAll();
    }

    @Override
    public List<AuctionEvent> searchAuctionEvent(String keyword) {
        return auctionEventRepository.findByEventName(keyword);
    }

    @Override
    public List<AuctionEvent> filterAuctionEvent(String status) {
        return auctionEventRepository.findByStatus(status);
    }
}
