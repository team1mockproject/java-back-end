package mock.auction.repository;

import mock.auction.entity.LocationEntity;

import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends AbstractRepository<LocationEntity> {
    LocationEntity findByProvinceAndCityAndAddressAndZipCode(
            String province,
            String city,
            String address,
            String zipCode);
}
