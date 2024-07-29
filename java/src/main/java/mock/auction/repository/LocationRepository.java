package mock.auction.repository;

import mock.auction.entity.LocationEntity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends AbstractRepository<LocationEntity> {
    @Query("SELECT l FROM LocationEntity l WHERE l.province = :province AND l.city = :city AND l.address = :address AND l.zipCode = :zipCode")
    LocationEntity findByProvinceAndCityAndAddressAndZipCode(
            @Param("province") String province,
            @Param("city") String city,
            @Param("address") String address,
            @Param("zipCode") String zipCode);
}
