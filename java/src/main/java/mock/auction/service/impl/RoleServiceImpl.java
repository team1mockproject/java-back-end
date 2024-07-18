package mock.auction.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mock.auction.entity.RoleEntity;
import mock.auction.repository.RoleRepository;
import mock.auction.service.RoleService;

/**
 * RoleServiceImpl
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
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Set<RoleEntity> getRoles(Set<String> rolesString, String forRole) throws Exception {
        Set<RoleEntity> roles = new HashSet<>();
        if (rolesString == null || rolesString.isEmpty()) {
            // add default role when null or empty
            RoleEntity defaultRole = roleRepository.findByName(forRole);
            if (defaultRole == null) {
                defaultRole = new RoleEntity(forRole);
                roleRepository.save(defaultRole);
            }
            roles.add(defaultRole);
        } else {
            for (String roleName : rolesString) {
                // find role in DB by role name
                RoleEntity role = roleRepository.findByName(roleName);

                if (role == null) {
                    // if not found, create new role
                    role = new RoleEntity(roleName);
                    roleRepository.save(role);
                }

                // add role to roles
                roles.add(role);
            }
        }
        return roles;
    }

}
