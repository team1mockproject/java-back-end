package com.mockproject.auction.repository;

import com.mockproject.auction.entity.AuctionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionEventRepository extends JpaRepository<AuctionEvent, Long> {

    List<AuctionEvent> findByEventName(String name);

    List<AuctionEvent> findByStatus(String status);
}
