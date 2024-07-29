package mock.auction.service;

import java.util.Set;

import mock.auction.entity.RoleEntity;

/**
 * RoleService
 * 
 * Version 1.0
 * 
 * Date: 13-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * 13-07-2024   kiet-kun-afk    Create
 */
public interface RoleService {
    public Set<RoleEntity> getRoles(Set<String> roles, String forRole) throws Exception;
}
