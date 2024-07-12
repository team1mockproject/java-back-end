package mock.auction.service;

import mock.auction.entity.Auction;

import java.time.LocalDateTime;
import java.util.List;

public interface AuctionService {
    public Auction addAuction(Auction auction);

    public Auction updateAuction(Integer id, Auction auction);

    public void deleteAuction(Integer id);

    public List<Auction> getAllAuction();

    public List<Auction> searchAuction(String keyword);

    public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, double minPrice,
            double maxPrice);
}
