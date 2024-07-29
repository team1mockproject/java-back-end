package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RegistParticipateAuction")
public class RegistParticipateAuction {
    @EmbeddedId
    private RegistParticipateAuctionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("auctionId")
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("accountId")
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    private String payment;

    private double amount;
}
