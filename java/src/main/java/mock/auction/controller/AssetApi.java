package mock.auction.controller;

import jakarta.annotation.Nullable;
import mock.auction.constants.AppConstants;
import mock.auction.entity.AssetEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.asset.AssetImg;
import mock.auction.service.AssetService;
import mock.auction.service.impl.AssetServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset/")
public class AssetApi extends BaseAPI<AssetDto, AssetEntity> {
    private AssetService assetService;

    public AssetApi(AssetServiceImp assetService) {
        super(assetService);
        this.assetService = assetService;
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<AssetDto>> getAllResources(int page, int size, String sort, @Nullable String filter, @Nullable String search, boolean all) {
        return ResponseEntity.ok(
                assetService.findAll(page, size, sort, filter, search, all));
    }
    @PostMapping
    public ResponseEntity<BaseResponse> create(@RequestBody AssetDto assetDto) {
        return ResponseEntity.ok(assetService.save(assetDto));
    }

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFile(@ModelAttribute AssetImg assetImg) {
        return ResponseEntity.ok(assetService.uploadFiles(assetImg.getAssetFiles(), AppConstants.ASSET_IMAGE_FOLDER));
    }
}
