package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.Auction;
import mock.auction.repository.AuctionRepository;
import mock.auction.repository.AuctionTypeRepository;
import mock.auction.service.AuctionService;

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
    public Auction updateAuction(Integer id, Auction auction) {
        Optional<Auction> existAuction = auctionRepository.findById(id);
        if (existAuction.isPresent()) {
            return auctionRepository.saveAndFlush(auction);
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteAuction(Integer id) {
        if (auctionRepository.findById(id).isPresent()) {
            auctionRepository.deleteById(id);
        } else {

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
    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, double minPrice,
            double maxPrice) {
        return auctionRepository.findAuctionsByDateRangeAndAmount(startDate, endDate, minPrice, maxPrice);
    }
}
