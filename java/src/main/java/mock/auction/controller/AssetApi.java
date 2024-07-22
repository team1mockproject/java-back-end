package mock.auction.controller;

import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import mock.auction.constants.AppConstants;
import mock.auction.entity.Asset;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.asset.AssetImg;
import mock.auction.request.AssetRequest;
import mock.auction.response.AssetResponse;
import mock.auction.service.AssetService;
import mock.auction.service.impl.AssetServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AssetApi
 * 
 * Version 1.0
 * 
 * Date: 22-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * 22-07-2024   kiet-kun-afk    Update
 */
@RestController
@RequestMapping("/api/asset/")
public class AssetApi extends BaseAPI<AssetDto, Asset> {
    private AssetService assetService;

    public AssetApi(AssetServiceImp assetService) {
        super(assetService);
        this.assetService = assetService;
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<AssetDto>> getAllResources(int page, int size, String sort,
            @Nullable String filter, @Nullable String search, boolean all) {
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

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(@Valid @ModelAttribute AssetRequest request,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(new BaseResponse(400, "Failed to create", errors));
        }
        try {
            AssetResponse asset = assetService.create(request);
            return ResponseEntity.ok().body(new BaseResponse(200, "Create asset successfully", asset));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BaseResponse(400, "Create asset failed", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse> getAll() {
        try {
            List<AssetResponse> assets = assetService.getAll();
            return ResponseEntity.ok().body(new BaseResponse(200, "Get all assets successfully", assets));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BaseResponse(400, "Get all assets failed", e.getMessage()));
        }
    }
}
