package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "CategoryAsset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryAssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_asset_id")
    private Integer categoryAssetId;
    private String name;
    private String description;
    @OneToMany(mappedBy="categoryAsset")
    private Collection<AssetEntity> assetEntities;
}
