package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.AccountEntity;
import mock.auction.entity.RoleEntity;
import mock.auction.repository.AccountRepository;
import mock.auction.repository.RoleRepository;
import mock.auction.service.AccountServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountServiceInterface {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public AccountEntity addStaff(AccountEntity accountEntity, Set<Integer> roleIds) {
        for (Integer roleId : roleIds) {
            RoleEntity role = new RoleEntity();
            role.setId(Math.toIntExact(roleId));
            accountEntity.getRoles().add(role);
        }

        return accountRepository.save(accountEntity);
    }

    @Override
    @Transactional
    public AccountEntity updateStaff(Integer id, AccountEntity accountEntity) {
        Optional<AccountEntity> account_Entity = accountRepository.findById(Math.toIntExact(id));
        if (account_Entity.isPresent()) {
            AccountEntity staff = account_Entity.get();
            staff.setFullName(accountEntity.getFullName());
            staff.setPhone(accountEntity.getPhone());
            staff.setEmail(accountEntity.getEmail());
            staff.setPassWord(accountEntity.getPassWord());
            staff.setGender(accountEntity.getGender());
            staff.setRoles(accountEntity.getRoles());
            staff.setLocation(accountEntity.getLocation());
            return accountRepository.save(staff);
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteStaff(Integer id) {
        if (accountRepository.existsById(Math.toIntExact(id))) {
            accountRepository.deleteById(Math.toIntExact(id));
        }

    }

    @Override
    public List<AccountEntity> getAllStaff() {
        return accountRepository.findByRolesName("staff");
    }

    @Override
    public List<AccountEntity> searchStaff(String keyword) {
        return accountRepository.findByFullNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<AccountEntity> filterStaff(String status) {
        if ("all".equalsIgnoreCase(status)) {
            return accountRepository.findByRolesName("staff");
        } else {
            return accountRepository.findByRolesNameAndStatus("staff", status);
        }
    }
}
