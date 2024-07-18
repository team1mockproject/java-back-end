package mock.auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import mock.auction.entity.CategoryAsset;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.ResponseObject;
import mock.auction.model.category.CategoryDto;
import mock.auction.request.CategoryRequest;
import mock.auction.response.CategoryResponse;
import mock.auction.service.CategoryService;
import mock.auction.service.impl.CategoryServiceImpl;

@RestController
@RequestMapping("api/authenticate/category")
public class CategoryAPI extends BaseAPI<CategoryDto, CategoryAsset> {
    private CategoryServiceImpl categoryService;

    @Autowired
    private CategoryService service;

    public CategoryAPI(CategoryServiceImpl categoryService) {
        super(categoryService);
        this.categoryService = categoryService;
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(@Valid CategoryDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(new BaseResponse(400, "Failed to create", errors));
        }
        return ResponseEntity.ok(categoryService.save(dto));
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<CategoryDto>> getAllResources(int page, int size, String sort,
            @Nullable String filter, @Nullable String search, boolean all) {
        return ResponseEntity.ok(categoryService.findAll(page, size, sort, filter, search, all));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ResponseObject> edit(@PathVariable Integer id, @Valid @RequestBody CategoryRequest request,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Edit failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            CategoryResponse response = service.editCategory(id, request);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Edit successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Edit failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<ResponseObject> getResourceById(@PathVariable Integer id) {
        try {
            CategoryResponse response = service.getById(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable Integer id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Delete successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Delete failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllCategory() {
        try {
            List<CategoryResponse> assets = categoryService.getAll();
            return ResponseEntity.ok().body(ResponseObject.builder()
                    .status(200)
                    .message("Get all categories successfully")
                    .data(assets)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all categories failed")
                    .data(e.getMessage())
                    .build());
        }
    }

}
