package mock.auction.repository;

import mock.auction.entity.RegistParticipateAuction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistParticipateAuctionRepository extends JpaRepository<RegistParticipateAuction, Integer> {
}
