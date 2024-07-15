package mock.auction.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import mock.auction.entity.Assessor;

public interface AssessorRepository extends JpaRepository<Assessor, Integer> {

    boolean existsByEmail(String email);

    Page<Assessor> findAll(Specification<Assessor> spec, Pageable pageable);
}
