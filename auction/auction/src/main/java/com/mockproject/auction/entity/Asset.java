package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "Asset")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long assetId;
    @Column(name = "asset_name")
    private String assetName;
    private String description;
    @Column(name = "asset_status")
    private String assetStatus;
    private String origin;
    @Column(name = "market_price")
    private Double marketPrice;
    @Column(name = "listing_date")
    private Date listingDate;
    @Column(name = "legal_status")
    private String legalStatus;
    @Column(name = "assessment_date")
    private Date assessmentDate;
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

    public Asset() {
    }

    public List<AssetFee> getAssetFees() {
        return assetFees;
    }

    public void setAssetFees(List<AssetFee> assetFees) {
        this.assetFees = assetFees;
    }

    public List<InventoryRecord> getInventoryRecords() {
        return inventoryRecords;
    }

    public void setInventoryRecords(List<InventoryRecord> inventoryRecords) {
        this.inventoryRecords = inventoryRecords;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }

    public List<Auction> getAuctions() {
        return auctions;
    }

    public void setAuctions(List<Auction> auctions) {
        this.auctions = auctions;
    }

    public List<AssetFile> getAssetFiles() {
        return assetFiles;
    }

    public void setAssetFiles(List<AssetFile> assetFiles) {
        this.assetFiles = assetFiles;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssetStatus() {
        return assetStatus;
    }

    public void setAssetStatus(String assetStatus) {
        this.assetStatus = assetStatus;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Double getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Double marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Date getListingDate() {
        return listingDate;
    }

    public void setListingDate(Date listingDate) {
        this.listingDate = listingDate;
    }

    public String getLegalStatus() {
        return legalStatus;
    }

    public void setLegalStatus(String legalStatus) {
        this.legalStatus = legalStatus;
    }

    public Date getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(Date assessmentDate) {
        this.assessmentDate = assessmentDate;
    }

    public String getAssessmentReport() {
        return assessmentReport;
    }

    public void setAssessmentReport(String assessmentReport) {
        this.assessmentReport = assessmentReport;
    }

    public String getShippingStatus() {
        return shippingStatus;
    }

    public void setShippingStatus(String shippingStatus) {
        this.shippingStatus = shippingStatus;
    }

    public Boolean getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }

    public CategoryAsset getCategoryAsset() {
        return categoryAsset;
    }

    public void setCategoryAsset(CategoryAsset categoryAsset) {
        this.categoryAsset = categoryAsset;
    }

    public AccountEntity getSeller() {
        return seller;
    }

    public void setSeller(AccountEntity seller) {
        this.seller = seller;
    }

    public Assessor getAssessor() {
        return assessor;
    }

    public void setAssessor(Assessor assessor) {
        this.assessor = assessor;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
