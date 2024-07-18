package mock.auction.service;

import mock.auction.entity.Asset;
import mock.auction.entity.Auction;
import mock.auction.response.AuctionResponse;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

public interface AuctionService {

	public Auction createAuction(Auction auction);

	public Auction updateAuction(Integer id, Auction auction);

	public void deleteAuction(Integer id);

	public List<AuctionResponse> getAllAuction();

	public List<AuctionResponse> searchAuction(String keyword);

	public List<AuctionResponse> filterAuction(LocalDateTime startDate, LocalDateTime endDate, Double minPrice,
			Double maxPrice);

	public Asset getAssetByAuctionId(Integer auctionId);

	public Auction closeAndFinalizeAuction(Integer auctionId, Integer winnerId, Double highestPrice,
			String paymentMethod, LocalDateTime timeLimit);

	public Page<AuctionResponse> searchAuctions(String auctionStatus, String sortOrder,
			Integer pageNumber, Integer pageSize, String keyWord) throws Exception;
}
