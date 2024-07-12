package mock.auction.entity;

import jakarta.persistence.*;

import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CategoryAsset")
public class CategoryAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_asset_id")
    private Integer categoryAssetId;
    private String name;
    private String description;
    @OneToMany(mappedBy = "categoryAsset")
    private List<Asset> assets;
}
