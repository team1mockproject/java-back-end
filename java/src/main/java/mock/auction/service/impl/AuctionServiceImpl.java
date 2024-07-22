package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mock.auction.entity.*;
import mock.auction.exception.EntityNotFoundException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.repository.*;
import mock.auction.repository.specifications.AuctionSpecification;
import mock.auction.request.AuctionRequest;
import mock.auction.response.AssetResponse;
import mock.auction.response.AuctionResponse;
import mock.auction.service.AuctionService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {
    private final AuctionRepository auctionRepository;
    private final AssetRepository assetRepository;
    private final AuctionTypeRepository auctionTypeRepository;
    private final AccountRepository accountRepository;
    private final AuctionEventRepository auctionEventRepository;
    private final RegistParticipateAuctionRepository registParticipateAuctionRepository;
    // private AuctionRepository auctionRepository;
    // private AssetRepository assetRepository;
    // private AuctionTypeRepository auctionTypeRepository;
    // private AccountRepository accountRepository;
    // @Autowired
    // private RegistParticipateAuctionRepository registParticipateAuctionRepository;

    // @Autowired
    // public AuctionServiceImpl(AuctionRepository auctionRepository, AssetRepository assetRepository,
    //         AuctionTypeRepository auctionTypeRepository, AccountRepository accountRepository,
    //         RegistParticipateAuctionRepository registParticipateAuctionRepository) {
    //     this.auctionRepository = auctionRepository;
    //     this.assetRepository = assetRepository;
    //     this.auctionTypeRepository = auctionTypeRepository;
    //     this.accountRepository = accountRepository;
    //     this.registParticipateAuctionRepository = registParticipateAuctionRepository;
    // }

    @Override
    @Transactional
    public Auction createAuction(Auction auction) {
        try {
            return auctionRepository.save(auction);
        } catch (Exception e) {
            throw new RuntimeException("Error updating auction", e);
        }
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
            throw new RuntimeException("Error deleting auction", e);
        }
    }

    @Override
    public List<AuctionResponse> getAllAuction() {
        try {
            return auctionRepository.findAll().stream().map(AuctionResponse::of).toList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all auctions", e);
        }
    }

    @Override
    public List<AuctionResponse> searchAuction(String keyword) {
        try {
            return auctionRepository.findByAsset_AssetName(keyword).stream().map(AuctionResponse::of).toList();
        } catch (Exception e) {
            throw new RuntimeException("Error searching auction by keyword", e);
        }
    }

    @Override
    public List<AuctionResponse> filterAuction(LocalDateTime startDate, LocalDateTime endDate, Double minPrice,
            Double maxPrice) {
        try {
            return auctionRepository.findAuctionsByDateRangeAndAmount(startDate, endDate, minPrice, maxPrice).stream()
                    .map(AuctionResponse::of).toList();
        } catch (Exception e) {
            throw new RuntimeException("Error filtering auctions", e);
        }
    }

    @Override
    public AssetResponse getAssetByAuctionId(Integer auctionId) {
        Auction auction = auctionRepository.findAuctionWithAssetById(auctionId)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found with id: " + auctionId));
        return AssetResponse.of(auction.getAsset());
    }

    //Create units when auction ends
    @Override
    @Transactional
    public AuctionResponse closeAndFinalizeAuction(Integer auctionId, Integer winnerId, Double highestPrice,
            String paymentMethod, LocalDateTime timeLimit) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found with id: " + auctionId));

        if (auction.getEndDate().isAfter(LocalDateTime.now())) {
            throw new IllegalStateException("Auction has not ended yet");
        }
        Asset asset = auction.getAsset();

        if (winnerId != null && highestPrice != null) {
            AccountEntity winner = accountRepository.findById(winnerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Winner not found with id: " + winnerId));

            // Fetch registration or participation fee for the winner
            RegistParticipateAuction registParticipateAuction = registParticipateAuctionRepository.findById(winnerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Registration/participation details not found"));
            double registrationFee = registParticipateAuction.getAmount();

            auction.setHighestPrice(highestPrice);
            auction.setWinner(winner);
            auction.setPaymentStatus("pending");
            auction.setPaymentAmount(highestPrice - registrationFee);
            auction.setPaymentMethod(paymentMethod);
            auction.setAuctionStatus("complete");

            asset.setAssetStatus("sold"); // Update asset status to 'sold'

            // Notification for winner
            sendNotification(winner, "You have won the auction for asset " + asset.getAssetName()
                    + " with a bid amount of: " + highestPrice);
        } else {
            asset.setAssetStatus("unsold"); // Update asset status to 'unsold'
        }
        if (auction.getEndDate().equals(LocalDateTime.now())) {
            auction.setAuctionStatus("closed");
            throw new IllegalStateException("Auction ended");
        }

        assetRepository.save(asset); // Save asset status change
        auctionRepository.save(auction);
        return AuctionResponse.of(auctionRepository.save(auction)); // Save auction changes
    }

    private void sendNotification(AccountEntity user, String message) {
        // send Notification
    }

    /**
     * search auctions
     * @param auctionStatus
     * @param sortOrder
     * @param pageNumber
     * @param pageSize
     * @param keyWord
     * @return List<AuctionResponse>
     * @throws Exception
     */
    @Override
    public Page<AuctionResponse> searchAuctions(String auctionStatus, String sortOrder, Integer pageNumber,
            Integer pageSize,
            String keyWord) throws Exception {
        if (auctionStatus == null) {
            auctionStatus = "preparing";
        }
        AuctionSpecification spec = createSpecification(auctionStatus, keyWord);
        Sort sort = Sort.by("asset.marketPrice");
        if ("desc".equalsIgnoreCase(sortOrder)) {
            sort = sort.descending();
        } else {
            sort = sort.ascending();
        }
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Auction> page = auctionRepository.findAll(spec, pageable);
        List<Auction> auctions = page.getContent().stream()
                .filter(auction -> auction.getDelFlag() == false).toList();

        List<AuctionResponse> auctionResponses = auctions.stream()
                .map(AuctionResponse::of)
                .toList();

        return new PageImpl<>(auctionResponses, pageable, page.getTotalElements());
    }

    private AuctionSpecification createSpecification(String auctionStatus, String keyWord) {
        AuctionSpecification spec = new AuctionSpecification(auctionStatus, keyWord);

        if (keyWord == null) {
            spec = null; // Return null specification to fetch all if no filters are applied
        }

        return spec;
    }

    private boolean isValidDate(LocalDateTime start, LocalDateTime end) {
        return start.isBefore(end);
    }

    private boolean isValidAuction(Asset asset, LocalDateTime start, LocalDateTime end) {
        List<Auction> auctions = auctionRepository.findAuctionsByAssetId(asset.getAssetId());
        for (Auction auction : auctions) {
            if (isDateOverlap(auction.getStartDate(), auction.getEndDate(), start, end)) {
                return false;
            }
        }
        return true;
    }

    private boolean isDateOverlap(LocalDateTime existingStart, LocalDateTime existingEnd, LocalDateTime newStart,
            LocalDateTime newEnd) {
        return !newStart.isAfter(existingEnd) && !newEnd.isBefore(existingStart);
    }

    @Override
    public AuctionResponse createAuction(AuctionRequest request) throws Exception {
        if (!isValidDate(request.getStartDate(), request.getEndDate())) {
            throw new Exception("Start date must be before end date");
        }
        if (!auctionTypeRepository.existsById(request.getAuctionTypeId())) {
            throw new Exception("Auction type not found" + request.getAuctionTypeId());
        }
        if (!assetRepository.existsById(request.getAssetId())) {
            throw new Exception("Asset not found" + request.getAssetId());
        }
        AuctionEvent event;
        if (request.getAuctionEventId() == null) {
            event = null;
        } else {
            event = auctionEventRepository.findById(request.getAuctionEventId())
                    .orElseThrow(() -> new Exception("Auction event not found: " + request.getAuctionEventId()));
        }
        Asset asset = assetRepository.findById(request.getAssetId()).get();
        LocalDateTime startDate = request.getStartDate();
        LocalDateTime endDate = request.getEndDate();
        if (!isValidAuction(asset, startDate, endDate)) {
            throw new Exception("This asset already has an auction scheduled for the specified time range.");
        }
        Auction auction = new Auction();
        auction.setAuctionEvent(event);
        auction.setAuctionType(auctionTypeRepository.findById(request.getAuctionTypeId()).get());
        auction.setAsset(asset);
        auction.setStartDate(startDate);
        auction.setEndDate(endDate);
        auction.setConductor(request.getConductor());
        auction.setStartingPrice(request.getStartingPrice());
        auction.setMinPriceIncrease(request.getMinPriceIncrease());
        auction.setAuctionStatus("preparing");
        auction.setDelFlag(false);
        auctionRepository.save(auction);
        return AuctionResponse.of(auction);
    }
}
