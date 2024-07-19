package mock.auction.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "Asset")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Integer assetId;
    @Column(name = "asset_name")
    private String assetName;
    private String description;
    @Column(name = "asset_status")
    private String assetStatus;
    private String origin;
    @Column(name = "market_price")
    private Double marketPrice;
    @Column(name = "listing_date")
    private LocalDateTime listingDate;
    @Column(name = "legal_status")
    private String legalStatus;
    @Column(name = "assessment_date")
    private LocalDateTime assessmentDate;
    @Column(name = "assessment_report")
    private String assessmentReport;
    @Column(name = "shipping_status")
    private String shippingStatus;
    @Column(name = "del_flag")
    private Boolean delFlag;

    @ManyToOne
    @JoinColumn(name = "category_asset_id")
    private CategoryAsset categoryAsset;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private AccountEntity seller;

    @ManyToOne
    @JoinColumn(name = "assessor_id")
    private Assessor assessor;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @OneToMany(mappedBy = "asset")
    private List<AssetFee> assetFees;

    @OneToMany(mappedBy = "asset")
    private List<InventoryRecord> inventoryRecords;

    @OneToMany(mappedBy = "asset")
    private List<Watchlist> watchlists;

    @OneToMany(mappedBy = "asset")
    private List<Auction> auctions;

    @OneToMany(mappedBy = "asset")
    private List<AssetFile> assetFiles;
}
