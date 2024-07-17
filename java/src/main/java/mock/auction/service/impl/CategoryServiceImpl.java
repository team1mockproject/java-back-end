package mock.auction.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mock.auction.constants.SearchFields;
import mock.auction.entity.CategoryAsset;
import mock.auction.exception.ResourceConflictException;
import mock.auction.model.category.CategoryDto;
import mock.auction.repository.CategoryRepository;
import mock.auction.request.CategoryRequest;
import mock.auction.response.CategoryResponse;
import mock.auction.service.CategoryService;
import mock.auction.utils.CloudinaryUtil;

import java.util.List;

@Service
public class CategoryServiceImpl extends AbstractService<CategoryDto, CategoryAsset> implements CategoryService {

    private ModelMapper modelMapper;
    private CloudinaryUtil cloudinaryUtil;

    @Autowired
    CategoryRepository categoryRepository;

    public CategoryServiceImpl(ModelMapper modelMapper, CategoryRepository categoryRepository,
            CloudinaryUtil cloudinaryUtil) {
        super(categoryRepository, CategoryDto.class, CategoryAsset.class, modelMapper,
                SearchFields.ACCOUNT_FIELD_TYPES, cloudinaryUtil);
        this.modelMapper = modelMapper;
        this.cloudinaryUtil = cloudinaryUtil;
    }

    @Override
    public CategoryAsset transformDtoToEntity(CategoryDto dto) {
        String name = dto.getName();
        if (!categoryRepository.existsByName(name)) {
            CategoryAsset entity = new CategoryAsset();
            entity = modelMapper.map(dto, CategoryAsset.class);
            return entity;
        } else {
            throw new ResourceConflictException(name, "This name already exists");
        }

    }

    @Override
    public CategoryResponse editCategory(Integer id, CategoryRequest request) throws Exception {
        CategoryAsset category = categoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));
        String name = request.getName();
        if (!category.getName().equals(name) && categoryRepository.existsByName(name)) {
            throw new Exception("This name already exists");
        }
        category.setName(name);
        category.setDescription(request.getDescription() == null ? category.getDescription()
                : request.getDescription());
        categoryRepository.save(category);
        return CategoryResponse.fromCategoryAsset(category);
    }

    @Override
    public CategoryResponse getById(Integer id) throws Exception {
        CategoryAsset category = categoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));
        return CategoryResponse.fromCategoryAsset(category);
    }

    @Override
    public List<CategoryAsset> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public void deleteCategory(Integer id) throws Exception {
        CategoryAsset category = categoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));
        if (!category.getAssets().isEmpty()) {
            throw new Exception("This category has assets");
        }
        categoryRepository.delete(category);
    }
}
