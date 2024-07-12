package mock.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mock.auction.entity.Auction;
import mock.auction.service.AuctionService;
import mock.auction.service.AuctionTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    private AuctionService auctionService;
    private AuctionTypeService auctionTypeService;

    @Autowired
    public AuctionController(AuctionService auctionService, AuctionTypeService auctionTypeService) {
        this.auctionService = auctionService;
        this.auctionTypeService = auctionTypeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Auction>> getAllAuction() {
        List<Auction> auctions = auctionService.getAllAuction();
        return ResponseEntity.ok(auctions);
    }

    @PostMapping("/add")
    public ResponseEntity<Auction> addAuction(@RequestBody Auction auction) {
        Auction addedAuction = auctionService.addAuction(auction);
        return new ResponseEntity<>(addedAuction, HttpStatus.CREATED);
    }

}
