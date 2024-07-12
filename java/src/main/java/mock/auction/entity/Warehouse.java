package mock.auction.entity;

import jakarta.persistence.*;

import java.util.Collection;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Warehouse")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Integer warehouseId;
    private String name;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;
    @OneToMany(mappedBy = "warehouse")
    private Collection<Asset> assets;
    @OneToMany(mappedBy = "warehouse")
    private Collection<InventoryRecord> inventoryRecords;
}