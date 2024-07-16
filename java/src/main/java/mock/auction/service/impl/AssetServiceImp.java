package mock.auction.service.impl;

import mock.auction.constants.AppConstants;
import mock.auction.constants.SearchFields;
import mock.auction.entity.*;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.model.ListResponse;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.asset.AssetImg;
import mock.auction.repository.*;
import mock.auction.service.AssetService;
import mock.auction.utils.CloudinaryUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssetServiceImp extends AbstractService<AssetDto, AssetEntity> implements AssetService {
    private AssetRepository assetRepository;
    private ModelMapper modelMapper;
    private AccountRepository accountRepository;
    private AssessorRepository assessorRepository;
    private WarehouseRepository warehouseRepository;
    private CloudinaryUtil cloudinaryUtil;

    private CategoryAssetRepository categoryAssetRepository;
    private AssetFileRepository assetFileRepository;

    public AssetServiceImp(AssetRepository assetRepository,
                           ModelMapper modelMapper,
                           AccountRepository accountRepository,
                           AssessorRepository assessorRepository,
                           WarehouseRepository warehouseRepository,
                           CloudinaryUtil cloudinaryUtil,
                           CategoryAssetRepository categoryAssetRepository,
                           AssetFileRepository assetFileRepository) {
        super(assetRepository, AssetDto.class, AssetEntity.class, modelMapper, SearchFields.ASSET_FIELD_TYPES,cloudinaryUtil);
        this.assetRepository = assetRepository;
        this.modelMapper = modelMapper;
        this.accountRepository = accountRepository;
        this.assessorRepository = assessorRepository;
        this.warehouseRepository = warehouseRepository;
        this.cloudinaryUtil = cloudinaryUtil;
        this.categoryAssetRepository = categoryAssetRepository;
        this.assetFileRepository = assetFileRepository;
    }

    @Override
    public AssetEntity transformDtoToEntity(AssetDto assetDto) {
        Integer assetId = assetDto.getAssetId();
        Integer sellerId = assetDto.getAccountId();
        Integer assessorId = assetDto.getAssessorId();
        Integer warehouseId = assetDto.getWarehouseId();
        Integer categoryId = assetDto.getCategoryAssetId();

        CategoryAssetEntity category = fetchCategory(categoryId);

        AssetEntity assetEntity = (assetId == null) ?
                createNewAssetEntity(assetDto, sellerId, category) :
                updateExistingAssetEntity(assetDto, assetId, assessorId, warehouseId, category);

        return assetEntity;
    }

    private boolean isSeller(AccountEntity account) {
        return account.getRoles().stream()
                .map(RoleEntity::getName)
                .anyMatch("seller"::equalsIgnoreCase);
    }

    private CategoryAssetEntity fetchCategory(Integer categoryId) {
        return categoryAssetRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(CategoryAssetEntity.class.getName(), "id", categoryId.toString()));
    }

    private AccountEntity fetchSeller(Integer sellerId) {
        return accountRepository.findById(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException(AccountEntity.class.getName(), "id", sellerId.toString()));
    }

    private AssessorEntity fetchAssessor(Integer assessorId) {
        return assessorRepository.findById(assessorId)
                .orElseThrow(() -> new ResourceNotFoundException(AssessorEntity.class.getName(), "id", assessorId.toString()));
    }

    private WarehouseEntity fetchWarehouse(Integer warehouseId) {
        return warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException(WarehouseEntity.class.getName(), "id", warehouseId.toString()));
    }

    private AssetEntity createNewAssetEntity(AssetDto assetDto, Integer sellerId, CategoryAssetEntity category) {
        validateNewAsset(assetDto, sellerId);
        assetDto.setListingDate(LocalDateTime.now());

        AssetEntity assetEntity = modelMapper.map(assetDto, AssetEntity.class);
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

    private AssetEntity updateExistingAssetEntity(AssetDto assetDto, Integer assetId, Integer assessorId, Integer warehouseId, CategoryAssetEntity category) {
        AssetEntity assetInDb = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException(AssetEntity.class.getName(), "id", assetId.toString()));

        if (assessorId != null) {
            AssessorEntity assessor = fetchAssessor(assessorId);
            if (assetInDb.getAssessor() == null) {
                assetInDb.setAssessor(assessor);
            }
        }

        WarehouseEntity warehouse = (warehouseId != null) ? fetchWarehouse(warehouseId) : null;
        assetDto.setListingDate(assetInDb.getListingDate());

        AssetEntity assetEntity = modelMapper.map(assetDto, AssetEntity.class);
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

    private boolean areUrlsEqual(List<AssetFileEntity> assetFiles, List<String> urls) {
        if (assetFiles.size() != urls.size()) {
            return false;
        }
        List<String> assetFileUrls = assetFiles.stream()
                .map(AssetFileEntity::getUrl)
                .collect(Collectors.toList());
        return assetFileUrls.containsAll(urls);
    }

    private void updateAssetFiles(AssetDto assetDto, AssetEntity assetEntity) {
        List<AssetFileEntity> assetFileEntityList = assetDto.getUrls().stream()
                .map(url -> createAssetFileEntity(url, assetEntity))
                .collect(Collectors.toList());

        assetEntity.setAssetFiles(assetFileEntityList);
    }

    private AssetFileEntity createAssetFileEntity(String url, AssetEntity assetEntity) {
        AssetFileEntity assetFile = new AssetFileEntity();
        assetFile.setUrl(url);
        assetFile.setAsset(assetEntity);
        return assetFile;
    }

    private String determineLegalStatus(AssetDto assetDto, Integer assessorId) {
        return (assessorId != null) ? assetDto.getLegalStatus() : "illegal";
    }


}
