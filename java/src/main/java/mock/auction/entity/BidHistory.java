package mock.auction.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BidHistory")
public class BidHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_history_id")
    private Integer bidHistoryId;
    @Column(name = "bid_date")
    private LocalDate bidDate;
    @Column(name = "bid_amount")
    private double bidAmount;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;
}
