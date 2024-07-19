package mock.auction.response;

import java.time.LocalDateTime;

import lombok.*;
import mock.auction.entity.Auction;

@Data
@NoArgsConstructor
public class AuctionResponse {
    private Integer auctionId;
    private String eventName;
    private String assetName;
    private String categoryName;
    private String auctionTypeName;
    private String img;
    private String conductor;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Double startingPrice;
    private Double minPriceIncrease;
    private Double marketPrice;
    private String period;
    private String auctionStatus;
    private Boolean delFlag;

    public AuctionResponse(Auction auction) {
        this.auctionId = auction.getAuctionId();
        this.eventName = auction.getAuctionEvent().getEventName();
        this.categoryName = auction.getAsset().getCategoryAsset().getName();
        this.assetName = auction.getAsset().getAssetName();
        this.img = auction.getAsset().getAssetFiles().isEmpty() ? null
                : auction.getAsset().getAssetFiles().get(0).getUrl();
        this.auctionTypeName = auction.getAuctionType().getName();
        this.conductor = auction.getConductor();
        this.startDate = auction.getStartDate();
        this.endDate = auction.getEndDate();
        this.startingPrice = auction.getStartingPrice();
        this.minPriceIncrease = auction.getMinPriceIncrease();
        this.marketPrice = auction.getAsset().getMarketPrice();
        this.period = auction.getPeriod();
        this.auctionStatus = auction.getAuctionStatus();
        this.delFlag = auction.getDelFlag();
    }

    public static AuctionResponse of(Auction auction) {
        return new AuctionResponse(auction);
    }
}
