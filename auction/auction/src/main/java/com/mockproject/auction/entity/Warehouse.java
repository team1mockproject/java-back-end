package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "Warehouse")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId;
    private String name;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;
    @OneToMany(mappedBy = "warehouse")
    private Collection<Asset> assets;
    @OneToMany(mappedBy = "warehouse")
    private Collection<InventoryRecord> inventoryRecords;
    public Warehouse() {
    }

    public Collection<Asset> getAssets() {
        return assets;
    }

    public void setAssets(Collection<Asset> assets) {
        this.assets = assets;
    }

    public Collection<InventoryRecord> getInventoryRecords() {
        return inventoryRecords;
    }

    public void setInventoryRecords(Collection<InventoryRecord> inventoryRecords) {
        this.inventoryRecords = inventoryRecords;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocationEntity getLocation() {
        return location;
    }

    public void setLocation(LocationEntity location) {
        this.location = location;
    }
}
