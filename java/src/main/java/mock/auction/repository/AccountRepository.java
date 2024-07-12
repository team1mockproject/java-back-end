package mock.auction.repository;

import mock.auction.entity.AccountEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends AbstractRepository<AccountEntity> {
    Optional<AccountEntity> findByEmail(String email);

    Optional<AccountEntity> findByPhone(String phone);

    List<AccountEntity> findByRolesName(String roleName);

    List<AccountEntity> findByRolesNameAndStatus(String roleName, String status);

    List<AccountEntity> findByFullNameContainingIgnoreCase(String keyword);
}
