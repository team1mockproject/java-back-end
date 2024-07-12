package com.mockproject.auction.service.impl;

import com.mockproject.auction.entity.AccountEntity;
import com.mockproject.auction.entity.RoleEntity;
import com.mockproject.auction.repository.AccountRepository;
import com.mockproject.auction.repository.RoleRepository;
import com.mockproject.auction.service.AccountService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public AccountEntity addStaff(AccountEntity accountEntity, Set<Long> roleIds) {
        for (Long roleId : roleIds) {
            RoleEntity role = new RoleEntity();
            role.setId(Math.toIntExact(roleId));
            accountEntity.getRoles().add(role);
        }

        return accountRepository.save(accountEntity);
    }

    @Override
    @Transactional
    public AccountEntity updateStaff(Long id, AccountEntity accountEntity) {
        Optional<AccountEntity> account_Entity = accountRepository.findById(Math.toIntExact(id));
        if(account_Entity.isPresent()){
            AccountEntity staff = account_Entity.get();
            staff.setFullName(accountEntity.getFullName());
            staff.setPhone(accountEntity.getPhone());
            staff.setEmail(accountEntity.getEmail());
            staff.setPassWord(accountEntity.getPassWord());
            staff.setDateOfBirth(accountEntity.getDateOfBirth());
            staff.setGender(accountEntity.getGender());
            staff.setRoles(accountEntity.getRoles());
            staff.setLocation(accountEntity.getLocation());
            return accountRepository.save(staff);
        }else{
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteStaff(Long id) {
        if(accountRepository.existsById(Math.toIntExact(id))){
            accountRepository.deleteById(Math.toIntExact(id));
        }

    }
    @Override
    public List<AccountEntity> geyAllStaff() {
        return accountRepository.findByRoles_Name("staff");
    }

    @Override
    public List<AccountEntity> searchStaff(String keyword) {
        return accountRepository.findByFullNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<AccountEntity> filterStaff(String status) {
        if ("all".equalsIgnoreCase(status)) {
            return accountRepository.findByRoles_Name("staff");
        } else {
            return accountRepository.findByRoles_NameAndStatus("staff", status);
        }
    }
}
