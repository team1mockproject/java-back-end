package mock.auction.service;

import mock.auction.entity.LocationEntity;

public interface LocationService {
    public void createLocation(LocationEntity location) throws Exception;

    public void deleteLocation(Integer id) throws Exception;
}
