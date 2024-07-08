package mock.auction.service.impl;

import lombok.AllArgsConstructor;
import mock.auction.exception.ComponentException;
import mock.auction.model.BaseResponse;
import mock.auction.repository.AbstractRepository;
import mock.auction.service.GenericService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public abstract class AbstractService<TDto,TEntity> implements GenericService<TDto,TEntity> {
    private AbstractRepository<TEntity> repository;
    private Class<TDto> dtoClass;
    private Class<TEntity> entityClass;
    private ModelMapper modelMapper;

    @Override
    public BaseResponse save(TDto dto) {
        try{
            TEntity entity = this.transformDtoToEntity(dto);
            this.repository.save(entity);
            return new BaseResponse(200,"Register account success");
        }catch (Exception e){
            throw new ComponentException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public TEntity transformDtoToEntity(TDto dto) {
        return modelMapper.map(dto,entityClass);
    }
}
