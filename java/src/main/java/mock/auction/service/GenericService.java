package mock.auction.service;

import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;

import java.util.List;

public interface GenericService<TDto, TEntity> {
    ListResponse<TDto> findAll(int page, int size, String sort, String filter, String search, boolean all);

    TDto findById(Integer id);

    BaseResponse save(TDto dto);

    TEntity transformDtoToEntity(TDto dto);

    void delete(Integer id);

    void delete(List<Integer> ids);

}
