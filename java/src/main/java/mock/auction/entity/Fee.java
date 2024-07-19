package mock.auction.entity;

import jakarta.persistence.*;

import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Fee")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fee_id")
    private Integer feeId;
    private String name;
    private String content;
    @OneToMany(mappedBy = "fee")
    private List<AssetFee> assetFees;
    @OneToMany(mappedBy = "fee")
    private List<AuctionFee> auctionFees;
}
