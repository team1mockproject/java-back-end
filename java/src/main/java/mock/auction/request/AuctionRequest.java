package mock.auction.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class AuctionRequest {

    @NotNull(message = "Start date is required")
    @Future(message = "Start date must be in future")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in future")
    private LocalDateTime endDate;

    @NotBlank(message = "Conductor is required")
    private String conductor;

    @NotNull(message = "Starting price is required")
    private Double startingPrice;

    @NotNull(message = "Min price is required")
    private Double minPriceIncrease;

    private Integer auctionTypeId;

    private Integer assetId;

    private Integer auctionEventId;
}
