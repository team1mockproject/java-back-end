package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.constants.SearchFields;
import mock.auction.entity.*;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.model.account.AccountDto;
import mock.auction.model.asset.AssetDto;
import mock.auction.model.asset.AssetFeeDto;
import mock.auction.model.asset.AssetFileDto;
import mock.auction.repository.*;
import mock.auction.service.AssetService;
import mock.auction.utils.CloudinaryUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private AuthServiceImpl authService;
    @Autowired
    private FeeRepository feeRepository;
    @Autowired
    private AssetFeeRepository assetFeeRepository;
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
    }

    @Transactional
    @Override
    public Asset transformDtoToEntity(AssetDto assetDto) {
        Integer assetId = assetDto.getAssetId();

        return assetId == null ? createNewAssetEntity(assetDto)
                : updateExistingAssetEntity(assetDto, assetId);
    }

    private boolean hasRole(AccountEntity account, String role) {
        return account.getRoles().stream()
                .map(RoleEntity::getName)
                .anyMatch(role::equalsIgnoreCase);
    }

    private boolean isStaff(UserDetails userDetails) {
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("Staff"::equalsIgnoreCase);
    }

    private CategoryAsset fetchCategory(Integer categoryId) {
        return categoryAssetRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(CategoryAsset.class.getName(), "id", categoryId.toString()));
    }

    private AccountEntity fetchAccount(Integer accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException(AccountEntity.class.getName(), "id", accountId.toString()));
    }

    private Assessor fetchAssessor(Integer assessorId) {
        return assessorRepository.findById(assessorId)
                .orElseThrow(() -> new ResourceNotFoundException(Assessor.class.getName(), "id", assessorId.toString()));
    }

    private Warehouse fetchWarehouse(Integer warehouseId) {
        return warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException(Warehouse.class.getName(), "id", warehouseId.toString()));
    }

    private Asset createNewAssetEntity(AssetDto assetDto) {
        Integer sellerId = assetDto.getAccountId();
        validateNewAsset(assetDto, sellerId);

        assetDto.setListingDate(LocalDateTime.now());
        Asset assetEntity = modelMapper.map(assetDto, Asset.class);

        assetEntity.setCategoryAsset(fetchCategory(assetDto.getCategoryAssetId()));
        assetEntity.setSeller(fetchAccount(sellerId));
        assetEntity.setLegalStatus(assetDto.getUrls().size() == 2 ? "legal" : "illegal");
        assetEntity.setAssetStatus("waiting");
        createAssetFee(assetDto,assetEntity);
        createAssetFiles(assetDto, assetEntity);

        return assetEntity;
    }

    private void validateNewAsset(AssetDto assetDto, Integer sellerId) {
        if (sellerId == null) {
            throw new ComponentException("Seller ID cannot be null", HttpStatus.BAD_REQUEST);
        }

        AccountEntity accountSeller = fetchAccount(sellerId);
        if (!hasRole(accountSeller, "seller")) {
            throw new ComponentException("Account is not a seller", HttpStatus.BAD_REQUEST);
        }

        if (assetDto.getUrls().isEmpty()) {
            throw new ComponentException("Must have photos and legal documents", HttpStatus.BAD_REQUEST);
        }
    }


    private Asset updateExistingAssetEntity(AssetDto assetDto, Integer assetId) {
        Asset assetInDb = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException(Asset.class.getName(), "id", assetId.toString()));

        if (isStaff(authService.getCurrentUser())) {
            updateAssetForStaff(assetDto, assetInDb);
        } else {
            assetDto.setListingDate(assetInDb.getListingDate());

            if (shouldUpdateAssetFiles(assetInDb.getAssetFiles(), assetDto.getUrls())) {
                updateAssetFiles(assetDto, assetInDb);
            }
            assetDto.setAssetFiles(convertAssetFilesToDtos(assetInDb.getAssetFiles()));
            assetDto.setSeller(modelMapper.map(assetInDb.getSeller(), AccountDto.class));
            assetDto.setAssetStatus(assetInDb.getAssetStatus());
            assetDto.setLegalStatus(assetInDb.getLegalStatus());
            assetInDb = modelMapper.map(assetDto, Asset.class);
            createAssetFee(assetDto,assetInDb);
            assetInDb.setCategoryAsset(fetchCategory(assetDto.getCategoryAssetId()));
        }

        return assetInDb;
    }


    private void updateAssetForStaff(AssetDto assetDto, Asset assetInDb) {
        Assessor assessor = fetchAssessorOrThrow(assetDto.getAssessorId());
        Warehouse warehouse = fetchWarehouseOrThrow(assetDto.getWarehouseId());

        if (assetDto.getAssessmentReport() == null) {
            throw new ComponentException("Please provide evaluation documents!", HttpStatus.BAD_REQUEST);
        }
        assetInDb.setAssessmentDate(LocalDateTime.now());
        assetInDb.setAssessor(assessor);
        assetInDb.setWarehouse(warehouse);
        assetInDb.setAssessmentReport(assetDto.getAssessmentReport());
        assetInDb.setAssetStatus(assetDto.getAssetStatus());
    }

    private Assessor fetchAssessorOrThrow(Integer assessorId) {
        return Optional.ofNullable(assessorId)
                .map(this::fetchAssessor)
                .orElseThrow(() -> new ComponentException("Haven't chosen an appraiser yet", HttpStatus.BAD_REQUEST));
    }

    private Warehouse fetchWarehouseOrThrow(Integer warehouseId) {
        return Optional.ofNullable(warehouseId)
                .map(this::fetchWarehouse)
                .orElseThrow(() -> new ComponentException("Haven't chosen a warehouse yet", HttpStatus.BAD_REQUEST));
    }

    private boolean shouldUpdateAssetFiles(List<AssetFile> assetFiles, List<String> urls) {
        return !areUrlsEqual(assetFiles, urls) && urls.size() == 2;
    }

    private boolean areUrlsEqual(List<AssetFile> assetFiles, List<String> urls) {
        if (assetFiles.size() != urls.size()) {
            return false;
        }

        Set<String> assetFileUrls = assetFiles.stream()
                .map(AssetFile::getUrl)
                .collect(Collectors.toSet());

        return assetFileUrls.containsAll(urls);
    }

    private void createAssetFiles(AssetDto assetDto, Asset assetEntity) {
        List<AssetFile> assetFileEntityList = assetDto.getUrls().stream()
                .map(url -> createAssetFileEntity(url, assetEntity))
                .collect(Collectors.toList());
        assetEntity.setAssetFiles(assetFileEntityList);
    }

    private void createAssetFee(AssetDto assetDto, Asset assetEntity){
        List<AssetFee> assetFeeEntityList = assetDto.getAssetFees().stream()
                .map(fee-> createAssetFeeEntity(fee,assetEntity))
                .collect(Collectors.toList());
        assetEntity.setAssetFees(assetFeeEntityList);
    }

    private void updateAssetFiles(AssetDto assetDto, Asset assetEntity) {
        List<AssetFile> assetFiles = assetEntity.getAssetFiles();
        for (int i = 0; i < assetFiles.size(); i++) {
            assetFiles.get(i).setUrl(assetDto.getUrls().get(i));
        }
    }

    private List<AssetFileDto> convertAssetFilesToDtos(List<AssetFile> assetFiles) {
        return assetFiles.stream()
                .map(assetFile -> modelMapper.map(assetFile, AssetFileDto.class))
                .collect(Collectors.toList());
    }

    private AssetFile createAssetFileEntity(String url, Asset assetEntity) {
        AssetFile assetFile = new AssetFile();
        assetFile.setUrl(url);
        assetFile.setAsset(assetEntity);
        return assetFile;
    }

    private AssetFee createAssetFeeEntity(AssetFeeDto assetFeeDto, Asset assetEntity){
        AssetFee assetFee = new AssetFee();
        // Initialize the composite key
        AssetFeeId assetFeeId = new AssetFeeId();
        assetFeeId.setAssetId(assetEntity.getAssetId());
        assetFeeId.setFeeId(assetFeeDto.getFeeId());

        // Set the composite key
        assetFee.setId(assetFeeId);
        assetFee.setAmount(assetFeeDto.getAmount());
        assetFee.setAsset(assetEntity);
        assetFee.setFee(fetchFeeOrThrow(assetFeeDto.getFeeId()));
        return assetFee;
    }

    private Fee fetchFeeOrThrow(Integer idFee){
        return Optional.ofNullable(idFee)
                .map(this::fetchFee)
                .orElseThrow(() -> new ComponentException("Haven't chosen a fee yet", HttpStatus.BAD_REQUEST));
    }

    private Fee fetchFee(Integer idFee) {
        return feeRepository.findById(idFee)
                .orElseThrow(() -> new ResourceNotFoundException(Fee.class.getName(), "id", idFee.toString()));
    }

}
