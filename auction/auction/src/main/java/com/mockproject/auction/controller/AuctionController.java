package com.mockproject.auction.controller;

import com.mockproject.auction.entity.Auction;
import com.mockproject.auction.service.AuctionService;
import com.mockproject.auction.service.AuctionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<List<Auction>> getAllAuction(){
        List<Auction> auctions = auctionService.getAllAuction();
        return ResponseEntity.ok(auctions);
    }

    @PostMapping("/add")
    public ResponseEntity<Auction> addAuction(@RequestBody Auction auction) {
        Auction addedAuction = auctionService.addAuction(auction);
        return new ResponseEntity<>(addedAuction, HttpStatus.CREATED);
    }

}
