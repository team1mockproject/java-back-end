package mock.auction.service;

import java.util.List;

import mock.auction.request.AssessorRequest;
import mock.auction.response.AssessorResponse;

/**
 * AssessorService
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
 */
public interface AssessorService {

    public AssessorResponse createAssessor(AssessorRequest request) throws Exception;

    public AssessorResponse editAssessor(Integer id, AssessorRequest request) throws Exception;

    public AssessorResponse getAssessor(Integer id) throws Exception;

    public List<AssessorResponse> getAllAssessors(String status, String sortBy,
            Integer pageNumber, Integer pageSize, String keyword) throws Exception;
}
