package mock.auction.service.impl;

import mock.auction.constants.SearchFields;
import mock.auction.entity.*;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.model.asset.AssetDto;
import mock.auction.repository.*;
import mock.auction.request.AssetRequest;
import mock.auction.response.AssetResponse;
import mock.auction.service.AssetService;
import mock.auction.utils.CloudinaryUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * AssetServiceImp
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
@Service
public class AssetServiceImp extends AbstractService<AssetDto, Asset> implements AssetService {
    private AssetRepository assetRepository;
    private ModelMapper modelMapper;
    private AccountRepository accountRepository;
    private AssessorRepository assessorRepository;
    private WarehouseRepository warehouseRepository;
    private CloudinaryUtil cloudinaryUtil;

    private CategoryAssetRepository categoryAssetRepository;
    private AssetFileRepository assetFileRepository;
    private FileService fileService;

    public AssetServiceImp(AssetRepository assetRepository,
            ModelMapper modelMapper,
            AccountRepository accountRepository,
            AssessorRepository assessorRepository,
            WarehouseRepository warehouseRepository,
            CloudinaryUtil cloudinaryUtil,
            CategoryAssetRepository categoryAssetRepository,
            AssetFileRepository assetFileRepository) {
        super(assetRepository, AssetDto.class, Asset.class, modelMapper, SearchFields.ASSET_FIELD_TYPES,
                cloudinaryUtil);
        this.assetRepository = assetRepository;
        this.modelMapper = modelMapper;
        this.accountRepository = accountRepository;
        this.assessorRepository = assessorRepository;
        this.warehouseRepository = warehouseRepository;
        this.cloudinaryUtil = cloudinaryUtil;
        this.categoryAssetRepository = categoryAssetRepository;
        this.assetFileRepository = assetFileRepository;
        this.fileService = new FileService();
    }

    @Override
    public Asset transformDtoToEntity(AssetDto assetDto) {
        Integer assetId = assetDto.getAssetId();
        Integer sellerId = assetDto.getAccountId();
        Integer assessorId = assetDto.getAssessorId();
        Integer warehouseId = assetDto.getWarehouseId();
        Integer categoryId = assetDto.getCategoryAssetId();

        CategoryAsset category = fetchCategory(categoryId);

        Asset assetEntity = (assetId == null) ? createNewAssetEntity(assetDto, sellerId, category)
                : updateExistingAssetEntity(assetDto, assetId, assessorId, warehouseId, category);

        return assetEntity;
    }

    private boolean isSeller(AccountEntity account) {
        return account.getRoles().stream()
                .map(RoleEntity::getName)
                .anyMatch("seller"::equalsIgnoreCase);
    }

    private CategoryAsset fetchCategory(Integer categoryId) {
        return categoryAssetRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(CategoryAsset.class.getName(), "id",
                        categoryId.toString()));
    }

    private AccountEntity fetchSeller(Integer sellerId) {
        return accountRepository.findById(sellerId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(AccountEntity.class.getName(), "id", sellerId.toString()));
    }

    private Assessor fetchAssessor(Integer assessorId) {
        return assessorRepository.findById(assessorId)
                .orElseThrow(() -> new ResourceNotFoundException(Assessor.class.getName(), "id",
                        assessorId.toString()));
    }

    private Warehouse fetchWarehouse(Integer warehouseId) {
        return warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException(Warehouse.class.getName(), "id",
                        warehouseId.toString()));
    }

    private Asset createNewAssetEntity(AssetDto assetDto, Integer sellerId, CategoryAsset category) {
        validateNewAsset(assetDto, sellerId);
        assetDto.setListingDate(LocalDateTime.now());

        Asset assetEntity = modelMapper.map(assetDto, Asset.class);
        updateAssetFiles(assetDto, assetEntity);
        assetEntity.setCategoryAsset(category);
        assetEntity.setLegalStatus("illegal");

        return assetEntity;
    }

    private void validateNewAsset(AssetDto assetDto, Integer sellerId) {
        if (sellerId == null) {
            throw new ComponentException("id seller not null", HttpStatus.BAD_REQUEST);
        }

        AccountEntity accountSeller = fetchSeller(sellerId);
        if (!isSeller(accountSeller)) {
            throw new ComponentException("not the seller", HttpStatus.BAD_REQUEST);
        }

        if (assetDto.getUrls().isEmpty()) {
            throw new ComponentException("Must have photos of the asset", HttpStatus.BAD_REQUEST);
        }
    }

    private Asset updateExistingAssetEntity(AssetDto assetDto, Integer assetId, Integer assessorId,
            Integer warehouseId, CategoryAsset category) {
        Asset assetInDb = assetRepository.findById(assetId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(Asset.class.getName(), "id", assetId.toString()));

        if (assessorId != null) {
            Assessor assessor = fetchAssessor(assessorId);
            if (assetInDb.getAssessor() == null) {
                assetInDb.setAssessor(assessor);
            }
        }

        Warehouse warehouse = (warehouseId != null) ? fetchWarehouse(warehouseId) : null;
        assetDto.setListingDate(assetInDb.getListingDate());

        Asset assetEntity = modelMapper.map(assetDto, Asset.class);
        if (!areUrlsEqual(assetInDb.getAssetFiles().stream().toList(), assetDto.getUrls())) {
            assetFileRepository.deleteAll(assetInDb.getAssetFiles());
            updateAssetFiles(assetDto, assetEntity);
        } else {
            assetEntity.setAssetFiles(assetInDb.getAssetFiles());
        }
        assetEntity.setCategoryAsset(category);
        assetEntity.setAssessor(assetInDb.getAssessor());
        assetEntity.setWarehouse(warehouse);
        assetEntity.setLegalStatus(determineLegalStatus(assetDto, assessorId));

        return assetEntity;
    }

    private boolean areUrlsEqual(List<AssetFile> assetFiles, List<String> urls) {
        if (assetFiles.size() != urls.size()) {
            return false;
        }
        List<String> assetFileUrls = assetFiles.stream()
                .map(AssetFile::getUrl)
                .collect(Collectors.toList());
        return assetFileUrls.containsAll(urls);
    }

    private void updateAssetFiles(AssetDto assetDto, Asset assetEntity) {
        List<AssetFile> assetFileEntityList = assetDto.getUrls().stream()
                .map(url -> createAssetFileEntity(url, assetEntity))
                .collect(Collectors.toList());

        assetEntity.setAssetFiles(assetFileEntityList);
    }

    private AssetFile createAssetFileEntity(String url, Asset assetEntity) {
        AssetFile assetFile = new AssetFile();
        assetFile.setUrl(url);
        assetFile.setAsset(assetEntity);
        return assetFile;
    }

    private String determineLegalStatus(AssetDto assetDto, Integer assessorId) {
        return (assessorId != null) ? assetDto.getLegalStatus() : "illegal";
    }

    @Transactional
    public void deleteAllFilesById(Integer id) {
        assetFileRepository.deleteByAssetId(id);
    }

    public List<AssetFile> getFiles(AssetRequest request, Asset asset) throws Exception {
        List<AssetFile> files = new ArrayList<AssetFile>();
        for (String fileName : fileService.uploadMulti(request.getImages())) {
            AssetFile photo = new AssetFile();
            photo.setAsset(asset);
            photo.setUrl(fileName);
            files.add(photo);
        }
        return files;
    }

    @Override
    public AssetResponse create(AssetRequest request) throws Exception {
        if (!categoryAssetRepository.existsById(request.getCategoryAssetId())) {
            throw new Exception("Category not found: " + request.getCategoryAssetId());
        }
        if (!assessorRepository.existsById(request.getAssessorId())) {
            throw new Exception("Assessor not found: " + request.getAssessorId());
        }
        if (!warehouseRepository.existsById(request.getWarehouseId())) {
            throw new Exception("Warehouse not found: " + request.getWarehouseId());
        }
        if (request.getAssessmentReport() == null) {
            throw new Exception("Assessment report is required");
        }
        if (request.getImages() == null) {
            throw new Exception("Files is required");
        }
        Asset asset = new Asset();
        asset.setCategoryAsset(categoryAssetRepository.findById(request.getCategoryAssetId()).get());
        asset.setAssessor(assessorRepository.findById(request.getAssessorId()).get());
        asset.setWarehouse(warehouseRepository.findById(request.getWarehouseId()).get());
        asset.setAssessmentReport(fileService.upload(request.getAssessmentReport()));

        asset.setAssetName(request.getAssetName());
        asset.setDescription(request.getDescription());
        asset.setOrigin(request.getOrigin());
        asset.setMarketPrice(request.getMarketPrice());
        asset.setLegalStatus(request.getLegalStatus());
        asset.setListingDate(LocalDateTime.now());
        asset.setDelFlag(false);
        asset.setAssetStatus("available");

        for (MultipartFile file : request.getImages()) {
            if (!fileService.isImageFile(file)) {
                throw new Exception("Images must be image(.png or .jpg or .jfif)");
            }
        }
        try {
            assetRepository.save(asset);
            List<AssetFile> files = getFiles(request, asset);
            deleteAllFilesById(asset.getAssetId());
            asset.setAssetFiles(files);
            assetFileRepository.saveAll(files);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return AssetResponse.of(asset);
    }

    @Override
    public List<AssetResponse> getAll() throws Exception {
        List<Asset> assets = assetRepository.findAll();
        return assets.stream().map(AssetResponse::of).toList();
    }

}
