package com.mockproject.auction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AssetFile")
public class AssetFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_file_id")
    private Integer assetFileId;

    private String url;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;

    public AssetFile() {
    }

    public Integer getAssetFileId() {
        return assetFileId;
    }

    public void setAssetFileId(Integer assetFileId) {
        this.assetFileId = assetFileId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }
}
