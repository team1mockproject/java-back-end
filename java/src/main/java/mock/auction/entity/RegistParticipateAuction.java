package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RegistParticipateAuction")
@IdClass(RegistParticipateAuctionId.class)
public class RegistParticipateAuction {
    @Id
    @Column(name = "auction_id")
    private Integer auctionId;
    @Id
    @Column(name = "account_id")
    private Integer accountId;

    private String payment;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "auction_id", insertable = false, updatable = false)
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private AccountEntity account;
}
