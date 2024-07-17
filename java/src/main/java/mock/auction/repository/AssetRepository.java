package mock.auction.repository;

import mock.auction.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {

}
