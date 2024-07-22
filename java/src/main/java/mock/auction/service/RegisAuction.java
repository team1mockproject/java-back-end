package mock.auction.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mock.auction.repository.AuctionRepository;

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
}
