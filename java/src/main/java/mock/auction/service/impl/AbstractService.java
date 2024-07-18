package mock.auction.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.AllArgsConstructor;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.repository.AbstractRepository;
import mock.auction.service.GenericService;
import mock.auction.utils.CloudinaryUtil;
import mock.auction.utils.SearchUtil;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public abstract class AbstractService<TDto, TEntity> implements GenericService<TDto, TEntity> {
    private AbstractRepository<TEntity> repository;
    private Class<TDto> dtoClass;
    private Class<TEntity> entityClass;
    private ModelMapper modelMapper;
    private Map<String, String> searchFiledTypes;
    private CloudinaryUtil cloudinaryUtil;

    @Override
    public ListResponse<TDto> findAll(int pageNumber, int size, String sort, String filter, String search,
            boolean all) {
        Specification<TEntity> sortable = RSQLJPASupport.toSort(sort);
        Specification<TEntity> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<TEntity> searchable = SearchUtil.pars(search, searchFiledTypes);
        Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(pageNumber - 1, size);
        Page<TEntity> page = repository.findAll(sortable.and(filterable).and(searchable), pageable);
        List<TEntity> entities = page.getContent();
        List<TDto> entityResponses = new ArrayList<>();
        for (TEntity entity : entities) {
            entityResponses.add(modelMapper.map(entity, dtoClass));
        }
        return ListResponse.of(entityResponses, page);
    }

    @Override
    public TDto findById(Integer id) {
        TEntity entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(entityClass.getName(), "id", id.toString()));
        return modelMapper.map(entity, dtoClass);
    }

    @Override
    public BaseResponse save(TDto dto) {
        try {
            TEntity entity = this.transformDtoToEntity(dto);
            this.repository.save(entity);
            return new BaseResponse(200, "Success", entity);
        } catch (Exception e) {
            throw new ComponentException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public TEntity transformDtoToEntity(TDto dto) {
        return modelMapper.map(dto, entityClass);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void delete(List<Integer> ids) {
        repository.deleteAllById(ids);
    }
}
