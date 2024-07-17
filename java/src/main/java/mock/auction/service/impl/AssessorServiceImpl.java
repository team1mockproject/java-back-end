package mock.auction.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mock.auction.constants.AppConstants;
import mock.auction.entity.Assessor;
import mock.auction.entity.LocationEntity;
import mock.auction.repository.AssessorRepository;
import mock.auction.repository.specifications.AssessorSpecification;
import mock.auction.request.AssessorRequest;
import mock.auction.response.AssessorResponse;
import mock.auction.service.AssessorService;
import mock.auction.service.LocationService;
import mock.auction.service.PublicHolidayChecker;

/**
 * AssessorServiceImpl
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
 * 15-07-2024   kiet-kun-afk    Update
 */
@Service
@RequiredArgsConstructor
public class AssessorServiceImpl implements AssessorService {

    private final AssessorRepository assessorRepository;
    private final LocationService locationService;
    private final PublicHolidayChecker checker;

    private LocationEntity resoleLocation(AssessorRequest request) throws Exception {
        LocationEntity location = new LocationEntity();
        location.setProvince(request.getProvince());
        location.setCity(request.getCity());
        location.setAddress(request.getAddress());
        return locationService.createLocation(location);
    }

    /**
     * create a new Assessor
     * @param AssessorRequest
     * @return AssessorResponse
     * @throws Exception
     */
    @Override
    public AssessorResponse createAssessor(AssessorRequest request) throws Exception {

        checker.isPublicHoliday(null);

        String email = request.getEmail();

        // check email
        if (assessorRepository.existsByEmail(email)) {
            throw new Exception("This email is already registered");
        }

        // resolve location
        LocationEntity location = resoleLocation(request);

        // create new Assessor
        Assessor assessor = new Assessor();
        assessor.setEmail(email);
        assessor.setPhone(request.getPhone());
        assessor.setName(request.getName());
        assessor.setLocation(location);
        assessor.setStatus(AppConstants.ACTIVE);

        // return response
        return AssessorResponse.fromAssessor(assessorRepository.save(assessor));
    }

    /**
     * edit information assessor
     * @param Integer id
     * @param AssessorRequest
     * @return AssessorResponse
     * @throws Exception
     */
    @Override
    public AssessorResponse editAssessor(Integer id, AssessorRequest request) throws Exception {
        Assessor assessor = assessorRepository.findById(id).get();

        // check is exist assessor in db
        if (assessor == null) {
            throw new Exception("Account not found");
        }

        String email = request.getEmail();

        // check is exist email in db with other assessor and status active
        boolean isExist = assessorRepository.existsByEmail(email);
        if (!assessor.getEmail().equals(email) && isExist) {
            throw new Exception("This email is already registered by other");
        }

        // resolve location
        LocationEntity location = resoleLocation(request);

        // set information Assessor
        assessor.setEmail(email);
        assessor.setName(request.getName());
        assessor.setPhone(request.getPhone());
        assessor.setLocation(location);

        // return response
        return AssessorResponse.fromAssessor(assessorRepository.save(assessor));
    }

    @Override
    public AssessorResponse getAssessor(Integer id) throws Exception {
        Assessor assessor = assessorRepository.findById(id).get();

        // check is exist assessor in db
        if (assessor == null) {
            throw new Exception("Account not found");
        }

        // return response
        return AssessorResponse.fromAssessor(assessor);
    }

    @Override
    public List<AssessorResponse> getAllAssessors(String status, String sortBy,
            Integer pageNumber, Integer pageSize, String keyword) throws Exception {
        Specification<Assessor> specification = Specification.where(AssessorSpecification.hasStatus(status))
                .and(AssessorSpecification.hasKeyword(keyword));
        Sort sort;
        if (sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by("name");
        } else {
            sort = Sort.by(sortBy);
        }
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Assessor> page = assessorRepository.findAll(specification, pageable);
        List<Assessor> assessors = page.getContent();
        return assessors.stream().map(AssessorResponse::fromAssessor).toList();
    }

}
