package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Location")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer locationId;
    private String province;
    private String city;
    private String address;
    @Column(name = "zip_code")
    private String zipCode;
//    @OneToMany(mappedBy="location")
//    private Collection<AccountEntity> accountEntities;

}
