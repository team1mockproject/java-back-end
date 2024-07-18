package mock.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mock.auction.entity.AuctionType;

import java.util.Optional;

public interface AuctionTypeRepository extends JpaRepository<AuctionType, Integer> {
    Optional<AuctionType> findByName(String typeName);

    Optional<AuctionType> findByAuctionTypeId(Integer id);
}
