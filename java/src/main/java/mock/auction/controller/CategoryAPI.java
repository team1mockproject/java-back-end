package mock.auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Nullable;
import mock.auction.entity.CategoryEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.category.CategoryDto;
import mock.auction.service.impl.CategoryService;

@RestController
@RequestMapping("api/authenticate/category")
public class CategoryAPI extends BaseAPI<CategoryDto, CategoryEntity> {
    private CategoryService categoryService;

    public CategoryAPI(CategoryService categoryService) {
        super(categoryService);
        this.categoryService = categoryService;
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(CategoryDto dto) {
        return ResponseEntity.ok(categoryService.save(dto));
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<CategoryDto>> getAllResources(int page, int size, String sort,
            @Nullable String filter, @Nullable String search, boolean all) {
        return ResponseEntity.ok(categoryService.findAll(page, size, sort, filter, search, all));
    }
}
