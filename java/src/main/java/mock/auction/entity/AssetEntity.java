package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "Asset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Integer assetId;
    @ManyToOne
    @JoinColumn(name="category_asset_id")
    private CategoryAssetEntity categoryAsset;
    @ManyToOne
    @JoinColumn(name="seller_id")
    private AccountEntity account;
    @Column(name="asset_name")
    private String assetName;
    private String description;
    @Column(name="asset_status")
    private String assetStatus;
    private String origin;
    @Column(name="market_price")
    private Double marketPrice;
    @Column(name="listing_date")
    private LocalDateTime listingDate;
    @Column(name="legal_status")
    private String legalStatus;
    @ManyToOne
    @JoinColumn(name="assessor_id")
    private AssessorEntity assessor;
    @Column(name="assessment_date")
    private LocalDateTime assessmentDate;
    @Column(name="assessment_report")
    private String assessmentReport;
    @ManyToOne
    @JoinColumn(name="warehouse_id")
    private WarehouseEntity warehouse;
    @Column(name="shipping_status")
    private String shippingStatus;
    @Column(name="del_flag")
    private boolean delFlag;
    @OneToMany(mappedBy="asset", cascade = CascadeType.ALL)
    private Collection<AssetFileEntity> assetFiles;
}
