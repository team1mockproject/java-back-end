package mock.auction.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@EqualsAndHashCode
public class AssetFeeId implements Serializable {

    @Column(name = "asset_id")
    private Integer assetId;
    @Column(name = "fee_id")
    private Integer feeId;
}
