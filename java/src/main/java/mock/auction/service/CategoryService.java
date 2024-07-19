package mock.auction.service;

import mock.auction.entity.CategoryAsset;
import mock.auction.request.CategoryRequest;
import mock.auction.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    public CategoryResponse editCategory(Integer id, CategoryRequest request) throws Exception;

    public void deleteCategory(Integer id) throws Exception;

    public CategoryResponse getById(Integer id) throws Exception;

    public List<CategoryAsset> getAllCategory();

    public List<CategoryResponse> getAll();

}
