package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Warehouse")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WarehouseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Integer warehouseId;
    private String name;
    @ManyToOne
    @JoinColumn(name="location_id")
    private LocationEntity location;
    @OneToMany(mappedBy="warehouse")
    private Collection<AssetEntity> assetEntities;
}
