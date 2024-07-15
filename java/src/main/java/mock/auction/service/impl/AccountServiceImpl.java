package mock.auction.service.impl;

import jakarta.transaction.Transactional;
import mock.auction.entity.AccountEntity;
import mock.auction.exception.EntityNotFoundException;
import mock.auction.repository.AccountRepository;
import mock.auction.repository.RoleRepository;
import mock.auction.service.AccountServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountServiceInterface {
    private AccountRepository accountRepository;


    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public AccountEntity addStaff(AccountEntity accountEntity) {
        try {
            return accountRepository.save(accountEntity);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error adding staff", e);
        }
    }

    @Override
    @Transactional
    public AccountEntity updateStaff(Integer id, AccountEntity accountEntity) {
        try {
            Optional<AccountEntity> existAccount = accountRepository.findById(id);
            if (existAccount.isPresent()) {
                return accountRepository.saveAndFlush(accountEntity);
            } else {
                throw new EntityNotFoundException("Staff not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error updating staff", e);
        }
    }

    @Override
    @Transactional
    public void deleteStaff(Integer id) {
        try {
            if (accountRepository.existsById(id)) {
                accountRepository.deleteById(id);
            } else {
                throw new EntityNotFoundException("Staff not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error deleting staff", e);
        }
    }

    @Override
    public List<AccountEntity> getAllStaff() {
        try {
            return accountRepository.findByRolesName("staff");
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error fetching all staff", e);
        }
    }

    @Override
    public List<AccountEntity> searchStaff(String keyword) {
        try {
            return accountRepository.findByFullNameContainingIgnoreCase(keyword);
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error searching staff by keyword", e);
        }
    }

    @Override
    public List<AccountEntity> filterStaff(String status) {
        try {
            if ("all".equalsIgnoreCase(status)) {
                return accountRepository.findByRolesName("staff");
            } else {
                return accountRepository.findByRolesNameAndStatus("staff", status);
            }
        } catch (Exception e) {
            // Handle exception, log it, and/or rethrow a custom exception
            throw new RuntimeException("Error filtering staff by status", e);
        }
    }

}
