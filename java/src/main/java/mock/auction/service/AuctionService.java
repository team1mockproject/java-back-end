package mock.auction.service;

import mock.auction.entity.Auction;

import java.time.LocalDateTime;
import java.util.List;

public interface AuctionService {
    public Auction createAuction(Auction auction,List<Integer> AssetIds);

    public Auction updateAuction(Integer id, Auction auction);

    public void deleteAuction(Integer id);

    public List<Auction> getAllAuction();

    public List<Auction> searchAuction(String keyword);

    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, Double minPrice,
            Double maxPrice);

    public Auction placeBid(Long auctionId, Long userId, Double bidAmount);

    public void closeAuction(Integer auctionId, Double highestPrice);
}
