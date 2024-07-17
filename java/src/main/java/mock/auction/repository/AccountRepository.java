package mock.auction.repository;

import mock.auction.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends AbstractRepository<AccountEntity> {
    Optional<AccountEntity> findByEmail(String email);
    Optional<AccountEntity> findByPhone(String phone);
}

