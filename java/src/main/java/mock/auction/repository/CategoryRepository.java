package mock.auction.repository;

import org.springframework.stereotype.Repository;

import mock.auction.entity.CategoryAsset;

@Repository
public interface CategoryRepository extends AbstractRepository<CategoryAsset> {

    boolean existsByName(String name);
}
