package mock.auction.service;

import java.util.List;
import java.util.Optional;

import mock.auction.entity.AuctionType;

public interface AuctionTypeService {

    public AuctionType addAuctionType(AuctionType auctionType);

    public AuctionType updateAuctionType(Integer id, AuctionType auctionType);

    public void deleteAuctionType(Integer id);

    public List<AuctionType> getAllAuctionType();

    public Optional<AuctionType> getAuctionTypeById(Integer id);
}
