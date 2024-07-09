package mock.auction.service.impl;

import mock.auction.entity.AccountEntity;
import mock.auction.entity.LocationEntity;
import mock.auction.entity.RoleEntity;
import mock.auction.exception.ComponentException;
import mock.auction.exception.ResourceConflictException;
import mock.auction.model.account.AccountDto;
import mock.auction.repository.AccountRepository;
import mock.auction.repository.LocationRepository;
import mock.auction.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService extends AbstractService<AccountDto, AccountEntity>{
    private AccountRepository accountRepository;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;
    private RoleRepository roleRepository;
    private LocationRepository locationRepository;
    public AccountService(AccountRepository accountRepository,
                          ModelMapper modelMapper,
                          PasswordEncoder passwordEncoder,
                          RoleRepository roleRepository,
                          LocationRepository locationRepository) {
        super(accountRepository, AccountDto.class, AccountEntity.class, modelMapper);
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.locationRepository = locationRepository;
    }

    private boolean isEmailUniqe(Integer accountId,String email){
        Optional<AccountEntity> accountByEmail = accountRepository.findByEmail(email);
        if (accountByEmail.isEmpty()){
            return true;
        }
        if(accountId==null){
            return false;
        }else{
            if(accountByEmail.get().getId() != accountId){
                return false;
            }
        }
        return true;
    }

    private boolean isPhoneUnique(Integer accountId,String phone){
        Optional<AccountEntity> accountByPhone = accountRepository.findByPhone(phone);
        if (accountByPhone.isEmpty()){
            return true;
        }
        if(accountId==null){
            return false;
        }else{
            if(accountByPhone.get().getId() != accountId){
                return false;
            }
        }
        return true;
    }

    private Collection<RoleEntity> setRoles(List<Integer> role_ids){
        Collection<RoleEntity> listRole = new ArrayList<>();
        listRole.addAll(roleRepository.findAllById(role_ids));
        return listRole;
    }
    @Override
    public AccountEntity transformDtoToEntity(AccountDto accountDto) {
        String email = accountDto.getEmail();
        Integer accountId = accountDto.getId();
        String phone = accountDto.getPhone();
        //check email have to unique
        if (!isEmailUniqe(accountId,email)) {
            throw new ResourceConflictException(email, "Email already exists");
        }

        //check phone have to unique
        if (!isPhoneUnique(accountId,phone)) {
            throw new ResourceConflictException(email, "Phone already exists");
        }

        AccountEntity accountEntity = new AccountEntity();
        accountEntity.setRoles(setRoles(accountDto.getRoleIds()));
        //if id null => create account
        if(accountId == null){
            accountEntity = modelMapper.map(accountDto,AccountEntity.class);
            String hashPassword = passwordEncoder.encode(accountDto.getPassWord());
            accountEntity.setPassWord(hashPassword);
        }else{//update account
            accountEntity = accountRepository.findById(accountId).get();
            modelMapper.map(accountDto,accountEntity);
            if (accountDto.getPassWord()!=null &&
                    !passwordEncoder.matches(accountDto.getPassWord(),
                            accountEntity.getPassWord())){
                String hashPassword = passwordEncoder.encode(accountDto.getPassWord());
                accountEntity.setPassWord(hashPassword);
            }
        }
        LocationEntity location = locationRepository.findById(accountDto.getLocationId())
                .orElseThrow(()->new ComponentException("ID location not found", HttpStatus.BAD_REQUEST));
        accountEntity.setLocation(location);
        return accountEntity;
    }
}
