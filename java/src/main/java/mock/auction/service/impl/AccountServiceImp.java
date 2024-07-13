package mock.auction.service.impl;

import mock.auction.constants.SearchFields;
import mock.auction.entity.AccountEntity;
import mock.auction.entity.LocationEntity;
import mock.auction.entity.RoleEntity;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceConflictException;
import mock.auction.exception.ResourceNotFoundException;
import mock.auction.model.BaseResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.account.SlipConfirm;
import mock.auction.repository.AccountRepository;
import mock.auction.repository.LocationRepository;
import mock.auction.repository.RoleRepository;
import mock.auction.service.AccountService;
import mock.auction.utils.CloudinaryUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImp extends AbstractService<AccountDto, AccountEntity> implements AccountService {
    private AccountRepository accountRepository;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;
    private RoleRepository roleRepository;
    private LocationRepository locationRepository;
    private CloudinaryUtil cloudinaryUtil;

    public AccountServiceImp(AccountRepository accountRepository,
                             ModelMapper modelMapper,
                             PasswordEncoder passwordEncoder,
                             RoleRepository roleRepository,
                             LocationRepository locationRepository,
                             CloudinaryUtil cloudinaryUtil) {
        super(accountRepository, AccountDto.class, AccountEntity.class, modelMapper, SearchFields.ACCOUNT_FIELD_TYPES,cloudinaryUtil);
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.locationRepository = locationRepository;
        this.cloudinaryUtil = cloudinaryUtil;
    }

    @Override
    public AccountEntity transformDtoToEntity(AccountDto accountDto) {
        Integer accountId = accountDto.getId();
        String email = accountDto.getEmail();
        String phone = accountDto.getPhone();
        if (!isEmailUnique(accountId, email)) {
            throw new ResourceConflictException(email, "Email already exists");
        }
        if (!isPhoneUnique(accountId, phone)) {
            throw new ResourceConflictException(phone, "Phone already exists");
        }
        AccountEntity accountEntity = accountDto.getId() == null ? createNewAccount(accountDto) : updateExistingAccount(accountDto);
        accountEntity.setLocation(fetchLocation(accountDto.getLocationId()));
        accountEntity.setRoles(setRoles(accountDto.getRoleIds()));

        return accountEntity;
    }

    private boolean isEmailUnique(Integer accountId, String email) {
        return isUnique(accountId, accountRepository.findByEmail(email));
    }

    private boolean isPhoneUnique(Integer accountId, String phone) {
        return isUnique(accountId, accountRepository.findByPhone(phone));
    }

    private boolean isUnique(Integer accountId, Optional<AccountEntity> accountEntityOptional) {
        if (accountEntityOptional.isEmpty()) {
            return true;
        }
        return accountId != null && accountEntityOptional.get().getId()==accountId;
    }

    private Collection<RoleEntity> setRoles(List<Integer> roleIds) {
        return roleRepository.findAllById(roleIds);
    }

    private AccountEntity createNewAccount(AccountDto accountDto) {
        accountDto.setPassWord(passwordEncoder.encode(accountDto.getPassWord()));
        return modelMapper.map(accountDto, AccountEntity.class);
    }

    private AccountEntity updateExistingAccount(AccountDto accountDto) {
        AccountEntity accountEntity = accountRepository.findById(accountDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(AccountEntity.class.getName(), "id", accountDto.getId().toString()));

        if (accountDto.getPassWord() != null && !passwordEncoder.matches(accountDto.getPassWord(), accountEntity.getPassWord())) {
            accountDto.setPassWord(passwordEncoder.encode(accountDto.getPassWord()));
        } else {
            accountDto.setPassWord(accountEntity.getPassWord());
        }

        return modelMapper.map(accountDto, AccountEntity.class);
    }

    private LocationEntity fetchLocation(Integer locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new ComponentException("ID location not found", HttpStatus.BAD_REQUEST));
    }


    @Override
    public BaseResponse acceptOrReject(SlipConfirm slipConfirm) {
        try {
            Integer idAccount = slipConfirm.getIdAccount();
            String type = slipConfirm.getType();
            if(idAccount!=null && type!=null){
                AccountEntity accountEntity = accountRepository.findById(idAccount)
                        .orElseThrow(()->new ResourceNotFoundException(AccountEntity.class.getName()
                                ,"id",idAccount.toString()));
                switch (type){
                    case "accept" : {
                        accountEntity.setStatus("active");
                        accountRepository.save(accountEntity);
                    }
                        return new BaseResponse(200,"accept success");
                    case "reject" : {
                        accountRepository.deleteById(idAccount);
                    }
                        return new BaseResponse(200,"reject success");
                    default: return new BaseResponse(400,"Invalid type ");
                }
            }
            return new BaseResponse(400,"id and type not null");
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
