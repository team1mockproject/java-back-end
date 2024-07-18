package mock.auction.controller;

import jakarta.validation.Valid;
import mock.auction.entity.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mock.auction.entity.Auction;
import mock.auction.model.BaseResponse;
import mock.auction.response.AuctionResponse;
import mock.auction.service.AuctionService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/authenticate/auction")
public class AuctionController {
    private AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Auction> addAuction(@Valid @RequestBody Auction auction) {
        Auction addedAuction = auctionService.createAuction(auction);
        return new ResponseEntity<>(addedAuction, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Auction> updateAuction(@Valid @RequestBody Auction auction, @PathVariable Integer id) {
        Auction existAuction = auctionService.updateAuction(id, auction);
        return ResponseEntity.ok(existAuction);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAuction(@PathVariable Integer id) {
        auctionService.deleteAuction(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<AuctionResponse>> filterAuction(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<AuctionResponse> auctions = auctionService.filterAuction(startDate, endDate, minPrice, maxPrice);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuctionResponse>> searchAuction(@RequestParam String keyword) {
        List<AuctionResponse> searchResults = auctionService.searchAuction(keyword);
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/{auctionId}/asset")
    public ResponseEntity<Asset> getAssetByAuctionId(@PathVariable Integer auctionId) {
        Asset asset = auctionService.getAssetByAuctionId(auctionId);
        return ResponseEntity.ok(asset);
    }

    // Create units when auction ends
    @PostMapping("/{auctionId}/finalize")
    public ResponseEntity<Auction> finalizeAuction(
            @PathVariable(required = false) Integer auctionId,
            @RequestParam(required = false) Integer winnerId,
            @RequestParam(required = false) Double winningBid,
            @RequestParam(required = false) String paymentMethod,
            @RequestParam(required = false) LocalDateTime timeLimit) {
        Auction auction = auctionService.closeAndFinalizeAuction(auctionId, winnerId, winningBid, paymentMethod,
                timeLimit);
        return ResponseEntity.ok(auction);
    }

    @GetMapping("/clients/search")
    public ResponseEntity<BaseResponse> searchAuctions(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sortOrder,
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size,
            @RequestParam(required = false) String keyword) {
        try {
            Page<AuctionResponse> auctions = auctionService.searchAuctions(
                    status,
                    sortOrder,
                    page.orElse(0),
                    size.orElse(10),
                    keyword);
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message("Search auction successfully")
                    .data(auctions)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Search auction failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
