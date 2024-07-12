package com.mockproject.auction.repository;

import com.mockproject.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    List<Auction> findByAsset_AssetName(String asset);

    @Query("SELECT a FROM Auction a WHERE a.startDate <= :endDate AND a.endDate >= :startDate AND a.startingPrice BETWEEN :minPrice AND :maxPrice")
    List<Auction> findAuctionsByDateRangeAndAmount(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice
    );
}
