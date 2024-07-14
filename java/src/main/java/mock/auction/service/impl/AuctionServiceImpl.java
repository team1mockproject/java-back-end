package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.Auction;
import mock.auction.exception.EntityNotFoundException;
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
        try {
            return auctionRepository.save(auction);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error adding auction", e);
        }
    }

    @Override
    @Transactional
    public Auction updateAuction(Integer id, Auction auction) {
        try {
            Optional<Auction> existAuction = auctionRepository.findById(id);
            if (existAuction.isPresent()) {
                return auctionRepository.saveAndFlush(auction);
            } else {
                throw new EntityNotFoundException("Auction not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error updating auction", e);
        }
    }

    @Override
    @Transactional
    public void deleteAuction(Integer id) {
        try {
            if (auctionRepository.findById(id).isPresent()) {
                auctionRepository.deleteById(id);
            } else {
                throw new EntityNotFoundException("Auction not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error deleting auction", e);
        }
    }

    @Override
    public List<Auction> getAllAuction() {
        try {
            return auctionRepository.findAll();
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error fetching all auctions", e);
        }
    }

    @Override
    public List<Auction> searchAuction(String keyword) {
        try {
            return auctionRepository.findByAsset_AssetName(keyword);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error searching auction by keyword", e);
        }
    }

    @Override
    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, Double minPrice, Double maxPrice) {
        try {
            return auctionRepository.findAuctionsByDateRangeAndAmount(startDate, endDate, minPrice, maxPrice);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error filtering auctions", e);
        }
    }

}
