package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AuctionFee")
@IdClass(AuctionFeeId.class)
public class AuctionFee {
    @Id
    @Column(name = "auction_id")
    private Integer auctionId;
    @Id
    @Column(name = "fee_id")
    private Integer feeId;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "auction_id", insertable = false, updatable = false)
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "fee_id", insertable = false, updatable = false)
    private Fee fee;
}
