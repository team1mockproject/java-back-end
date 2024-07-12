package mock.auction.service;

import java.util.List;
import mock.auction.entity.AuctionEvent;

public interface AuctionEventService {

    public AuctionEvent addAuctionEvent(AuctionEvent auctionEvent);

    public AuctionEvent updateAuctionEvent(Integer id, AuctionEvent auctionEvent);

    public void deleteAuctionEvent(Integer id);

    public List<AuctionEvent> geyAllAuctionEvent();

    public List<AuctionEvent> searchAuctionEvent(String keyword);

    public List<AuctionEvent> filterAuctionEvent(String status);
}
