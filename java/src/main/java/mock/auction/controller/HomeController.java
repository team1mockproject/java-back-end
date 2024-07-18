package mock.auction.controller;

import mock.auction.entity.Auction;
import mock.auction.entity.AuctionEvent;
import mock.auction.entity.CategoryAsset;
import mock.auction.response.AuctionResponse;
import mock.auction.service.AuctionEventService;
import mock.auction.service.AuctionService;
import mock.auction.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/authenticate/home")
public class HomeController {
    private CategoryService categoryService;
    private AuctionEventService auctionEventService;
    private AuctionService auctionService;

    @Autowired
    public HomeController(CategoryService categoryService, AuctionEventService auctionEventService,
            AuctionService auctionService) {
        this.categoryService = categoryService;
        this.auctionEventService = auctionEventService;
        this.auctionService = auctionService;
    }

    @GetMapping("/auction")
    public ResponseEntity<List<AuctionResponse>> getAllAuction() {
        List<AuctionResponse> auctions = auctionService.getAllAuction();
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/event")
    public ResponseEntity<List<AuctionEvent>> getAllEvent() {
        List<AuctionEvent> auctionEvents = auctionEventService.geyAllAuctionEvent();
        return ResponseEntity.ok(auctionEvents);
    }

    @GetMapping("/category")
    public ResponseEntity<List<CategoryAsset>> getAllCategory() {
        List<CategoryAsset> categoryAssets = categoryService.getAllCategory();
        return ResponseEntity.ok(categoryAssets);
    }
}
