package mock.auction.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mock.auction.entity.AuctionEvent;
import mock.auction.model.ResponseObject;
import mock.auction.service.AuctionEventService;

import java.util.List;

@RestController
@RequestMapping("/api/AuctionEvent")
public class AuctionEventController {
    @Autowired
    private AuctionEventService auctionEventService;

    public AuctionEventController(AuctionEventService auctionEventService) {
        this.auctionEventService = auctionEventService;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllAuctionEvent() {
        try {
            List<AuctionEvent> allAuctionEvent = auctionEventService.geyAllAuctionEvent();
            return ResponseEntity.ok().body(ResponseObject.builder()
                    .status(200)
                    .message("successfully")
                    .data(allAuctionEvent)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<AuctionEvent> addAuctionEvent(@Valid @RequestBody AuctionEvent auctionEvent) {
        AuctionEvent savedAuctionEvent = auctionEventService.addAuctionEvent(auctionEvent);
        return new ResponseEntity<>(savedAuctionEvent, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuctionEvent> updateAuctionEvent(@Valid @PathVariable Integer id,
            @RequestBody AuctionEvent auctionEvent) {
        return ResponseEntity.ok(auctionEventService.updateAuctionEvent(id, auctionEvent));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAuctionEvent(@PathVariable Integer id) {
        auctionEventService.deleteAuctionEvent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<AuctionEvent>> filterStaff(@RequestParam String status) {
        return ResponseEntity.ok(auctionEventService.filterAuctionEvent(status));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuctionEvent>> searchStaff(@RequestParam String keyword) {
        List<AuctionEvent> searchResults = auctionEventService.searchAuctionEvent(keyword);
        return ResponseEntity.ok(searchResults);
    }

}
