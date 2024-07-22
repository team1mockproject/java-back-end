package mock.auction.entity;

import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WatchlistId implements Serializable {

    private Integer buyerId;
    private Integer assetId;
}
