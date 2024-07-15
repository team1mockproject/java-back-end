package mock.auction.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mock.auction.entity.Auction;
import mock.auction.service.AuctionService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/authenticate/auction")
public class AuctionController {
    private AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Auction> addAuction(@Valid @RequestBody Auction auction, @RequestBody List<Integer> assetIds) {
        Auction addedAuction = auctionService.createAuction(auction,assetIds);
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
    public ResponseEntity<List<Auction>> filterAuction(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<Auction> auctions = auctionService.filterAuction(startDate, endDate, minPrice, maxPrice);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Auction>> searchAuction(@RequestParam String keyword) {
        List<Auction> searchResults = auctionService.searchAuction(keyword);
        return ResponseEntity.ok(searchResults);
    }

}
