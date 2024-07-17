package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Assessor")
public class Assessor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessor_id")
    private Integer assessorId;
    private String name;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String phone;
    private String status;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;
    @OneToMany(mappedBy = "assessor")
    private List<Asset> assets;

}
