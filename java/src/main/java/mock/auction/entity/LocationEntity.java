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
    private int location_id;
    private String province;
    private String city;
    private String address;
    private String zip_code;
    @OneToMany(mappedBy="location")
    private Collection<AccountEntity> accountEntities;
}
