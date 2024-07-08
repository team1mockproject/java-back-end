package mock.auction.service;

import mock.auction.model.BaseResponse;

public interface GenericService<TDto,TEntity> {
    BaseResponse save(TDto dto);
    TEntity transformDtoToEntity(TDto dto);
}
