package mock.auction.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mock.auction.constants.SearchFields;
import mock.auction.entity.CategoryEntity;
import mock.auction.exception.ResourceConflictException;
import mock.auction.model.category.CategoryDto;
import mock.auction.repository.CategoryRepository;

@Service
public class CategoryService extends AbstractService<CategoryDto, CategoryEntity> {

    private ModelMapper modelMapper;

    @Autowired
    CategoryRepository categoryRepository;

    public CategoryService(ModelMapper modelMapper, CategoryRepository categoryRepository) {
        super(categoryRepository, CategoryDto.class, CategoryEntity.class, modelMapper,
                SearchFields.ACCOUNT_FIELD_TYPES);
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryEntity transformDtoToEntity(CategoryDto dto) {
        String name = dto.getName();
        if (!categoryRepository.existsByName(name)) {
            CategoryEntity entity = new CategoryEntity();
            entity = modelMapper.map(dto, CategoryEntity.class);
            return entity;
        } else {
            throw new ResourceConflictException(name, "This name already exists");
        }

    }

}
