package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.AuctionEvent;
import mock.auction.exception.EntityNotFoundException;
import mock.auction.repository.AuctionEventRepository;
import mock.auction.service.AuctionEventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionEventServiceImpl implements AuctionEventService {
    private AuctionEventRepository auctionEventRepository;

    @Autowired
    public AuctionEventServiceImpl(AuctionEventRepository auctionEventRepository) {
        this.auctionEventRepository = auctionEventRepository;
    }

    @Override
    @Transactional
    public AuctionEvent addAuctionEvent(AuctionEvent auctionEvent) {
        try {
            return auctionEventRepository.save(auctionEvent);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error adding auction event", e);
        }
    }

    @Override
    @Transactional
    public AuctionEvent updateAuctionEvent(Integer id, AuctionEvent auctionEvent) {
        try {
            Optional<AuctionEvent> auctionEvent1 = auctionEventRepository.findById(id);
            if (auctionEvent1.isPresent()) {
                return auctionEventRepository.saveAndFlush(auctionEvent);
            } else {
                throw new EntityNotFoundException("Auction event not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error updating auction event", e);
        }
    }

    @Override
    @Transactional
    public void deleteAuctionEvent(Integer id) {
        try {
            if (auctionEventRepository.findById(id).isPresent()) {
                auctionEventRepository.deleteById(id);
            } else {
                throw new EntityNotFoundException("Auction event not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error deleting auction event", e);
        }
    }

    @Override
    public List<AuctionEvent> geyAllAuctionEvent() {
        try {
            return auctionEventRepository.findAll();
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error fetching all auction events", e);
        }
    }

    @Override
    public List<AuctionEvent> searchAuctionEvent(String keyword) {
        try {
            return auctionEventRepository.findByEventName(keyword);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error searching auction event by keyword", e);
        }
    }

    @Override
    public List<AuctionEvent> filterAuctionEvent(String status) {
        try {
            return auctionEventRepository.findByStatus(status);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error filtering auction events by status", e);
        }
    }

}
