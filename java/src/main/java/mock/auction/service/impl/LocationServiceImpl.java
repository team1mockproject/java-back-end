package mock.auction.service.impl;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mock.auction.entity.LocationEntity;
import mock.auction.repository.LocationRepository;
import mock.auction.service.LocationService;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    private boolean isValid(String province, String city, String zipCode)
            throws Exception {
        if (province.isBlank()) {
            throw new Exception("Province cannot be blank");
        }
        if (province.length() < 2 || province.length() > 50) {
            throw new Exception("Province must be between 2 and 50 characters long");
        }
        if (city.isBlank()) {
            throw new Exception("City cannot be blank");
        }
        if (city.length() < 3 || city.length() > 50) {
            throw new Exception("City must be between 3 and 50 characters long");
        }
        if (zipCode.isBlank()) {
            throw new Exception("Zip code cannot be blank");
        }
        if (!zipCode.matches("\\d{5}")) {
            throw new Exception("Zip code must be 5-digit numbers");
        }
        return true;
    }

    @Override
    public void createLocation(LocationEntity locationRequest) throws Exception {
        String province = locationRequest.getProvince();
        String city = locationRequest.getCity();
        String zipCode = locationRequest.getZipCode();
        String address = locationRequest.getAddress();
        if (isValid(province, city, zipCode)) {
            LocationEntity location = locationRepository.findByProvinceAndCityAndAddressAndZipCode(
                    province,
                    city,
                    address,
                    zipCode);
            if (location == null) {
                location = new LocationEntity();
                location.setProvince(province);
                location.setCity(city);
                location.setAddress(address);
                location.setZipCode(zipCode);
            }
            locationRepository.save(location);
        }
    }

    @Override
    public void deleteLocation(Integer id) throws Exception {
        locationRepository.deleteById(id);
    }

}
