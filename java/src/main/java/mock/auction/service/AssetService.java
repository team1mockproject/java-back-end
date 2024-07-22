package mock.auction.service;

import java.util.List;

import mock.auction.entity.Asset;
import mock.auction.model.asset.AssetDto;
import mock.auction.request.AssetRequest;
import mock.auction.response.AssetResponse;

public interface AssetService extends GenericService<AssetDto, Asset> {

    public AssetResponse create(AssetRequest request) throws Exception;

    public List<AssetResponse> getAll() throws Exception;
}
