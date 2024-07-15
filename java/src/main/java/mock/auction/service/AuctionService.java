package mock.auction.service;

import mock.auction.entity.Auction;
import mock.auction.response.AuctionResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface AuctionService {
	public Auction addAuction(Auction auction);

	public Auction updateAuction(Integer id, Auction auction);

	public void deleteAuction(Integer id);

	public List<Auction> getAllAuction();

	public List<Auction> searchAuction(String keyword);

	public List<Auction> filterAuction(LocalDateTime startDate, LocalDateTime endDate, Double minPrice,
			Double maxPrice);

	public List<AuctionResponse> searchAuctions(String auctionStatus, String sortOrder,
			Integer pageNumber, Integer pageSize, String keyWord) throws Exception;
}
