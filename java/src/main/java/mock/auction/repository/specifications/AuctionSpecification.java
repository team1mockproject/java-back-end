package mock.auction.repository.specifications;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.*;
import mock.auction.entity.Auction;

public class AuctionSpecification implements Specification<Auction> {

    private final String auctionStatus;
    private final String keyWord;

    public AuctionSpecification(String auctionStatus, String keyWord) {
        this.auctionStatus = auctionStatus;
        this.keyWord = keyWord;
    }

    @Override
    public Predicate toPredicate(Root<Auction> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        Predicate auctionStatusPredicate = builder.equal(root.get("auctionStatus"), auctionStatus);

        Predicate keyWordPredicate = builder.or(
                builder.like(root.get("conductor"), "%" + keyWord + "%"),
                builder.like(root.get("asset").get("assetName"), "%" + keyWord + "%"),
                builder.like(root.get("asset").get("description"), "%" + keyWord + "%"),
                builder.like(root.get("asset").get("origin"), "%" + keyWord + "%"),
                builder.like(root.get("asset").get("categoryAsset").get("name"), "%" + keyWord + "%"),
                builder.like(root.get("asset").get("categoryAsset").get("description"), "%" + keyWord + "%"),
                builder.like(root.get("auctionEvent").get("eventName"), "%" + keyWord + "%"),
                builder.like(root.get("auctionEvent").get("location").get("province"), "%" + keyWord + "%"),
                builder.like(root.get("auctionType").get("name"), "%" + keyWord + "%"));

        return builder.and(auctionStatusPredicate, keyWordPredicate);
    }
}
