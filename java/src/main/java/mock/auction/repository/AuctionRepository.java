package mock.auction.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mock.auction.entity.Auction;
import mock.auction.repository.specifications.AuctionSpecification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AuctionRepository extends JpaRepository<Auction, Integer>, JpaSpecificationExecutor<Auction> {

    List<Auction> findByAsset_AssetName(String asset);

    /*@Query("SELECT a FROM Auction a WHERE a.startDate <= :endDate AND a.endDate >= :startDate AND a.startingPrice BETWEEN :minPrice AND :maxPrice")
    List<Auction> findAuctionsByDateRangeAndAmount(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        @Param("minPrice") double minPrice,
        @Param("maxPrice") double maxPrice);*/

    @Query("SELECT a FROM Auction a WHERE " +
            "(:startDate IS NULL OR a.endDate >= :startDate) AND " +
            "(:endDate IS NULL OR a.startDate <= :endDate) AND " +
            "(:minPrice IS NULL OR a.startingPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR a.startingPrice <= :maxPrice)")
    List<Auction> findAuctionsByDateRangeAndAmount(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice);

    @Query("SELECT a FROM Auction a JOIN FETCH a.asset WHERE a.id = :auctionId")
    Optional<Auction> findAuctionWithAssetById(@Param("auctionId") Integer auctionId);

    Page<Auction> findAllByDelFlagFalse(AuctionSpecification spec, Pageable pageable);
}
