package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AssetFile")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssetFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_file_id")
    private Integer assetFileId;
    private String url;
    @ManyToOne
    @JoinColumn(name="asset_id")
    private AssetEntity asset;
}
