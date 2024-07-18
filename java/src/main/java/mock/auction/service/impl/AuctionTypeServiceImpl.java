package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.AuctionType;
import mock.auction.repository.AuctionTypeRepository;
import mock.auction.service.AuctionTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionTypeServiceImpl implements AuctionTypeService {
    private AuctionTypeRepository auctionTypeRepository;

    @Autowired

    public AuctionTypeServiceImpl(AuctionTypeRepository auctionTypeRepository) {
        this.auctionTypeRepository = auctionTypeRepository;
    }

    @Override
    @Transactional
    public AuctionType addAuctionType(AuctionType auctionType) {
        return auctionTypeRepository.save(auctionType);
    }

    @Override
    @Transactional
    public AuctionType updateAuctionType(Integer id, AuctionType auctionType) {
        Optional<AuctionType> existAuctionType = auctionTypeRepository.findById(id);
        if (existAuctionType.isPresent()) {
            return auctionTypeRepository.saveAndFlush(auctionType);
        } else {
            return null;
        }

    }

    @Override
    @Transactional
    public void deleteAuctionType(Integer id) {
        if (auctionTypeRepository.findById(id).isPresent()) {
            auctionTypeRepository.deleteById(id);
        }
    }

    @Override
    public List<AuctionType> getAllAuctionType() {
        return auctionTypeRepository.findAll();
    }

    @Override
    public Optional<AuctionType> getAuctionTypeById(Integer id) {
        return auctionTypeRepository.findById(id);
    }
}
