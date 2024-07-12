package mock.auction.repository;

import org.springframework.stereotype.Repository;

import mock.auction.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends AbstractRepository<CategoryEntity> {

    boolean existsByName(String name);
}
