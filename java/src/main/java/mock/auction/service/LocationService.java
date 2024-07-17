package mock.auction.service;

import mock.auction.entity.LocationEntity;

/**
 * LocationService
 * 
 * Version 1.0
 * 
 * Date: 12-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * 12-07-2024   kiet-kun-afk    Create
 */
public interface LocationService {
    public LocationEntity createLocation(LocationEntity location) throws Exception;

    public void deleteLocation(Integer id) throws Exception;
}
