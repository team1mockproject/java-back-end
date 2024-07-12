package mock.auction.controller;

import jakarta.annotation.Nullable;
import mock.auction.constants.AppConstants;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.service.GenericService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class BaseAPI<TDto, TEntity> {
    private GenericService<TDto, TEntity> service;

    public BaseAPI(GenericService<TDto, TEntity> service) {
        this.service = service;
    }

    public ResponseEntity<?> create(@RequestBody TDto dto, BindingResult bindingResult) {
        return ResponseEntity.ok(service.save(dto));
    }

    public ResponseEntity<ListResponse<TDto>> getAllResources(
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter,
            @RequestParam(name = "search", required = false) @Nullable String search,
            @RequestParam(name = "all", required = false) boolean all) {
        return ResponseEntity.ok(
                service.findAll(page, size, sort, filter, search, all));
    }

    @GetMapping("{id}")
    public ResponseEntity<TDto> getResource(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse> deleteResource(@PathVariable("id") Integer id) {
        service.delete(id);
        return ResponseEntity.ok(new BaseResponse(200, "delete success", null));
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> deleteResources(@RequestBody List<Integer> ids) {
        service.delete(ids);
        return ResponseEntity.ok(new BaseResponse(200, "delete success", null));
    }

}
