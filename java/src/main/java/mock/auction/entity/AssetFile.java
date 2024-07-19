package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
