package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CategoryAsset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_asset_id")
    private Integer id;

    private String name;

    private String description;
}
