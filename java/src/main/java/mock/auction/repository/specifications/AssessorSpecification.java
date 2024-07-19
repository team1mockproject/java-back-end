package mock.auction.repository.specifications;

import org.springframework.data.jpa.domain.Specification;

import mock.auction.entity.Assessor;

public class AssessorSpecification {
    public static Specification<Assessor> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status != null && !status.equals("")) {
                return cb.equal(root.get("status"), status);
            }
            return null;
        };
    }

    public static Specification<Assessor> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String likePattern = "%" + keyword.toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), likePattern));
        };
    }
}
