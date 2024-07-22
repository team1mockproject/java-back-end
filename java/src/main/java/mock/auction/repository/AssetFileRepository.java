package mock.auction.repository;

import mock.auction.entity.AssetFile;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AssetFileRepository extends AbstractRepository<AssetFile> {

    @Modifying
    @Transactional
    @Query("DELETE FROM AssetFile a WHERE a.asset.assetId = :id")
    void deleteByAssetId(@Param("id") Integer id);
}
