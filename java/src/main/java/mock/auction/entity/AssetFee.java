package mock.auction.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "AssetFee")
//@IdClass(AssetFeeId.class)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AssetFee{
    @EmbeddedId
    private AssetFeeId id;

    private double amount;

    @ManyToOne
    @MapsId("assetId")
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @ManyToOne
    @MapsId("feeId")
    @JoinColumn(name = "fee_id")
    private Fee fee;
}
