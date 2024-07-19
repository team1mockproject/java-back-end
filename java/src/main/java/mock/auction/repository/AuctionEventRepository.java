package mock.auction.repository;

import mock.auction.entity.AuctionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionEventRepository extends JpaRepository<AuctionEvent, Integer> {

    List<AuctionEvent> findByEventName(String name);

    List<AuctionEvent> findByStatus(String status);
}
