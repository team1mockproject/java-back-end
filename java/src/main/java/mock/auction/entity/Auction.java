package mock.auction.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Auction")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_id")
    private Integer auctionId;
    @Column(name = "start_date")
    private LocalDateTime startDate;
    @Column(name = "end_date")
    private LocalDateTime endDate;
    private String conductor;
    @Column(name = "starting_price")
    private Double startingPrice;
    @Column(name = "min_price_increase")
    private Double minPriceIncrease;
    private String period;
    @Column(name = "highest_price")
    private Double highestPrice;
    @Column(name = "auction_status")
    private String auctionStatus;
    @Column(name = "payment_status")
    private String paymentStatus;
    @Column(name = "payment_date")
    private Date paymentDate;
    @Column(name = "payment_amount")
    private Double paymentAmount;
    @Column(name = "payment_method")
    private String paymentMethod;
    @Column(name = "del_flag")
    private Boolean delFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private Asset asset;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_type_id")
    private AuctionType auctionType;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "winner_id")
    private AccountEntity winner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_event_id")
    private AuctionEvent auctionEvent;
}