package mock.auction.entity;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CategoryAsset")
public class CategoryAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_asset_id")
    private Integer categoryAssetId;
    @Column(length = 255)
    private String name;
    @Column(columnDefinition = "varchar(max)")
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "categoryAsset")
    private List<Asset> assets;
}
