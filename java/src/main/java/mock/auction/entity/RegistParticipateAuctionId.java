package mock.auction.entity;

import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistParticipateAuctionId implements Serializable {
    private Integer auctionId;
    private Integer accountId;
}
