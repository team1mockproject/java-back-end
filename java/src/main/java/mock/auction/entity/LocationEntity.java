package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private Collection<AccountEntity> accountEntities;
    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private Collection<Warehouse> warehouses;
    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private Collection<Assessor> assessors;
    @JsonIgnore
    @OneToMany(mappedBy = "location")
    private Collection<AuctionEvent> auctionEvents;

    @ManyToOne
    @JoinColumn(name = "state_code")
    private State state;
}
