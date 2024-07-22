package mock.auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import mock.auction.model.ResponseObject;
import mock.auction.response.RegisResponse;
import mock.auction.service.RegisAuction;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RegisAuctionController {

    private final RegisAuction regisService;

    @PutMapping("/regis/{id}")
    public ResponseEntity<ResponseObject> regisAuction(@PathVariable Integer id) throws Exception {
        try {
            RegisResponse regisResponse = regisService.regisAuction(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Regis successfully")
                    .data(regisResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Regis failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
