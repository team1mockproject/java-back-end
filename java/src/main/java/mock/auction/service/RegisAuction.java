package mock.auction.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mock.auction.entity.AccountEntity;
import mock.auction.entity.Auction;
import mock.auction.entity.RegistParticipateAuction;
import mock.auction.entity.RegistParticipateAuctionId;
import mock.auction.repository.AuctionRepository;
import mock.auction.repository.RegistParticipateAuctionRepository;
import mock.auction.response.RegisResponse;

/**
 * RegisAuction
 * 
 * Version 1.0
 * 
 * Date: 22-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * 22-07-2024   kiet-kun-afk    Create
 */
@Service
@RequiredArgsConstructor
public class RegisAuction {

    private final AuctionRepository auctionRepository;
    private final AuthService authService;
    private final RegistParticipateAuctionRepository repository;
    private final PublicHolidayChecker publicHolidayChecker;

    public RegisResponse regisAuction(Integer auctionId) throws Exception {
        publicHolidayChecker.isPublicHoliday(null);
        AccountEntity account = authService.getAuth();
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new Exception("Auction not found: " + auctionId));
        if (!auction.getAuctionStatus().equals("preparing")) {
            throw new Exception("This auction is ongoing or is already completed");
        }
        RegistParticipateAuctionId id = new RegistParticipateAuctionId(auctionId, account.getId());
        RegistParticipateAuction regisAuction = new RegistParticipateAuction();
        regisAuction.setId(id);
        regisAuction.setPayment("not pay yet");
        regisAuction.setAmount(0);
        regisAuction.setAccount(account);
        regisAuction.setAuction(auction);
        repository.save(regisAuction);
        return RegisResponse.of(regisAuction);
    }
}
