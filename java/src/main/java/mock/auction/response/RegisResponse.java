package mock.auction.response;

import java.time.LocalDateTime;

import lombok.*;
import mock.auction.entity.RegistParticipateAuction;

@Data
public class RegisResponse {

    private String fullName;

    private String email;

    private String assetName;

    private String auctionStatus;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String payment;

    private double amount;

    public RegisResponse(RegistParticipateAuction entity) {
        this.email = entity.getAccount().getEmail();
        this.fullName = entity.getAccount().getFullName();
        this.assetName = entity.getAuction().getAsset().getAssetName();
        this.auctionStatus = entity.getAuction().getAuctionStatus();
        this.startDate = entity.getAuction().getStartDate();
        this.endDate = entity.getAuction().getEndDate();
        this.payment = entity.getPayment();
        this.amount = entity.getAmount();
    }

    public static RegisResponse of(RegistParticipateAuction entity) {
        return new RegisResponse(entity);
    }
}
