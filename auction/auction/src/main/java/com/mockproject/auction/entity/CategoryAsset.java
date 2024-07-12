package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "CategoryAsset")
public class CategoryAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_asset_id")
    private Long categoryAssetId;
    private String name;
    private String description;
    @OneToMany(mappedBy = "categoryAsset")
    private List<Asset> assets;

    public CategoryAsset() {
    }

    public void setCategoryAssetId(Long categoryAssetId) {
        this.categoryAssetId = categoryAssetId;
    }

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }

    public CategoryAsset(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public long getCategoryAssetId() {
        return categoryAssetId;
    }

    public void setCategoryAssetId(long categoryAssetId) {
        this.categoryAssetId = categoryAssetId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
