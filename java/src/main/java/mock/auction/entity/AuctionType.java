package mock.auction.entity;

import jakarta.persistence.*;

import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AuctionType")
public class AuctionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_type_id")
    private Integer auctionTypeId;
    private String name;
    @Column(name = "del_flag")
    private Boolean delFlag;
    @OneToMany(mappedBy = "auctionType")
    private List<Auction> auctions;
}
