package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AssetFee")
@IdClass(AssetFeeId.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssetFee {
    @Id
    @Column(name = "asset_id")
    private Integer assetId;
    @Id
    @Column(name = "fee_id")
    private Integer feeId;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "asset_id", insertable = false, updatable = false)
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "fee_id", insertable = false, updatable = false)
    private Fee fee;
}
