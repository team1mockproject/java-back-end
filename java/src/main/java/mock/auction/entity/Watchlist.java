package mock.auction.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Watchlist")
@IdClass(WatchlistId.class)
public class Watchlist {
    @Id
    @Column(name = "buyer_id")
    private Integer buyerId;
    @Id
    @Column(name = "asset_id")
    private Integer assetId;

    @ManyToOne
    @JoinColumn(name = "buyer_id", insertable = false, updatable = false)
    private AccountEntity buyer;

    @ManyToOne
    @JoinColumn(name = "asset_id", insertable = false, updatable = false)
    private Asset asset;
}