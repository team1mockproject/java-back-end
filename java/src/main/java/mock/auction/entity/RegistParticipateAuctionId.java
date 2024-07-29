package mock.auction.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class RegistParticipateAuctionId implements Serializable {
    @Column(name = "auction_id")
    private Integer auctionId;

    @Column(name = "account_id")
    private Integer accountId;

    @Override
    public int hashCode() {
        return Objects.hash(auctionId, accountId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        RegistParticipateAuctionId that = (RegistParticipateAuctionId) obj;
        return Objects.equals(auctionId, that.auctionId) && Objects.equals(accountId, that.accountId);
    }
}
