package mock.auction.entity;

import java.io.Serializable;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetFeeId implements Serializable {

    private Integer assetId;
    private Integer feeId;
}
