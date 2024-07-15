package mock.auction.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mock.auction.model.BaseResponse;
import mock.auction.request.AssessorRequest;
import mock.auction.response.AssessorResponse;
import mock.auction.service.AssessorService;

/**
 * AssessorController
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
@RestController
@RequestMapping("/api/authenticate/assessor")
@RequiredArgsConstructor
public class AssessorController {

    private final AssessorService assessorService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(@Valid @RequestBody AssessorRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Invalid request")
                    .data(result.getFieldErrors().stream().map(err -> err.getDefaultMessage()).toList())
                    .build());
        }
        try {
            AssessorResponse response = assessorService.createAssessor(request);
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message("Create assessor successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Create assessor failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BaseResponse> edit(@PathVariable Integer id,
            @Valid @RequestBody AssessorRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Invalid request")
                    .data(result.getFieldErrors().stream().map(err -> err.getDefaultMessage()).toList())
                    .build());
        }
        try {
            AssessorResponse response = assessorService.editAssessor(id, request);
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message("Edit assessor successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Edit assessor failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> get(@PathVariable Integer id) {
        try {
            AssessorResponse response = assessorService.getAssessor(id);
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message("Get assessor successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Get assessor failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sort,
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size,
            @RequestParam(required = false) String search) {
        try {
            List<AssessorResponse> response = assessorService.getAllAssessors(status, sort,
                    page.orElse(0),
                    size.orElse(10), search);
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message("Get all assessors successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message("Get all assessors failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
