package mock.auction.repository;

import mock.auction.entity.RoleEntity;
import org.springframework.stereotype.Repository;

/**
 * RoleRepository
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
 * dd-MM-yyyy   Bảo             Create
 * 13-07-2024   kiet-kun-afk    Update
 */
@Repository
public interface RoleRepository extends AbstractRepository<RoleEntity> {
    RoleEntity findByName(String name);
}
