package com.mockproject.auction.repository;

import com.mockproject.auction.entity.AuctionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuctionTypeRepository extends JpaRepository<AuctionType, Long> {
    Optional<AuctionType> findByName(String typeName);

    Optional<AuctionType> findByAuctionTypeId(Long id);
}
