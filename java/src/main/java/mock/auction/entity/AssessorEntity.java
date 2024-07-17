package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Assessor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssessorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessor_id")
    private Integer assessorId;
    @ManyToOne
    @JoinColumn(name="location_id")
    private LocationEntity location;
    private String email;
    private String phone;
    @OneToMany(mappedBy="assessor")
    private Collection<AssetEntity> assetEntities;
}
