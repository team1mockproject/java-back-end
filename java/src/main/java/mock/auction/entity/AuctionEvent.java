package mock.auction.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AuctionEvent")
public class AuctionEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_event_id")
    private Integer auctionEventId;
    @Column(name = "event_name")
    private String eventName;
    @Column(name = "start_date")
    private LocalDateTime startDate;
    @Column(name = "end_date")
    private LocalDateTime endDate;
    private String status;
    @Column(name = "del_flag")
    private Boolean delFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private LocationEntity location;

    @OneToMany(mappedBy = "auctionEvent", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Auction> auctions;
}
