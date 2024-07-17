package mock.auction.repository;

import mock.auction.entity.AccountEntity;
import mock.auction.entity.LocationEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends AbstractRepository<LocationEntity>{
}
