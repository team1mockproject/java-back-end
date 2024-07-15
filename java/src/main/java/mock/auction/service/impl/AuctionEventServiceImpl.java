package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.AuctionEvent;
import mock.auction.entity.LocationEntity;
import mock.auction.repository.AuctionEventRepository;
import mock.auction.service.AuctionEventService;
import mock.auction.service.PublicHolidayChecker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionEventServiceImpl implements AuctionEventService {

    @Autowired
    private PublicHolidayChecker holidayChecker;

    private AuctionEventRepository auctionEventRepository;

    @Autowired
    public AuctionEventServiceImpl(AuctionEventRepository auctionEventRepository) {
        this.auctionEventRepository = auctionEventRepository;
    }

    @Override
    @Transactional
    public AuctionEvent addAuctionEvent(AuctionEvent auctionEvent) {
        try {
            LocationEntity location = auctionEvent.getLocation();
            String stateCode = location.getState().getStateCode();
            holidayChecker.isPublicHoliday(stateCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return auctionEventRepository.save(auctionEvent);
    }

    @Override
    @Transactional
    public AuctionEvent updateAuctionEvent(Integer id, AuctionEvent auctionEvent) {
        Optional<AuctionEvent> auctionEvent1 = auctionEventRepository.findById(id);
        if (auctionEvent1.isPresent()) {
            return auctionEventRepository.saveAndFlush(auctionEvent);
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteAuctionEvent(Integer id) {
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
