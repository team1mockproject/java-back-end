package mock.auction.service;

import mock.auction.request.CategoryRequest;
import mock.auction.response.CategoryResponse;

public interface CategoryService {

    public CategoryResponse editCategory(Integer id, CategoryRequest request) throws Exception;

    public void deleteCategory(Integer id) throws Exception;

    public CategoryResponse getById(Integer id) throws Exception;
}
