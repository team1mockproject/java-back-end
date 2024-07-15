package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.Asset;
import mock.auction.entity.Auction;
import mock.auction.entity.AuctionType;
import mock.auction.exception.EntityNotFoundException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.repository.AssetRepository;
import mock.auction.repository.AuctionRepository;
import mock.auction.repository.AuctionTypeRepository;
import mock.auction.service.AuctionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {
    private AuctionRepository auctionRepository;
    private AssetRepository assetRepository;
    private AuctionTypeRepository auctionTypeRepository;

    public AuctionServiceImpl(AuctionRepository auctionRepository, AssetRepository assetRepository, AuctionTypeRepository auctionTypeRepository) {
        this.auctionRepository = auctionRepository;
        this.assetRepository = assetRepository;
        this.auctionTypeRepository = auctionTypeRepository;
    }

    @Autowired


    @Override
    @Transactional
    public Auction createAuction(Auction auction, List<Integer> assetIds) {
        Auction auction2 = new Auction();
        auction2.setConductor(auction.getConductor());
        auction2.setPeriod(auction.getPeriod());
        auction2.setAuctionStatus("upcoming");

        List<Asset> assets = new ArrayList<>();
        try {
            for (int i = 0; i < assetIds.size(); i++) { // Change <= to < for proper indexing
                int finalI = i;
                Asset asset = assetRepository.findById(assetIds.get(i))
                        .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetIds.get(finalI)));
                assets.add(asset);
            }

            // Set assets and additional properties for each asset
            for (int i = 0; i < assets.size(); i++) {
                Asset asset = assets.get(i);
                auction2.setStartDate(LocalDateTime.now().plusHours(2 * i));
                auction2.setEndDate(LocalDateTime.now().plusHours(2 * (i + 1)));
                auction2.setStartingPrice(asset.getMarketPrice());
            }

            AuctionType auctionType = auctionTypeRepository.findById(auction.getAuctionId())
                    .orElseThrow(() -> new ResourceNotFoundException("AuctionType not found with id: " + auction.getAuctionId()));
            auction2.setAuctionType(auctionType);

        } catch (Exception e) {
            throw new RuntimeException("Error adding auction", e);
        }
        return auctionRepository.save(auction2);
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

    //Create an invoice when there is an auction winner
    @Override
    public Auction placeBid(Long auctionId, Long userId, Double bidAmount) {
        return null;
    }

    @Override
    public void closeAuction(Long auctionId) {

    }

}
