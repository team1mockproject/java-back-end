package com.mockproject.auction.service;

import com.mockproject.auction.entity.AccountEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface AccountService {
    public AccountEntity addStaff(AccountEntity accountEntity, Set<Long> roleIds);

    public AccountEntity updateStaff(Long id, AccountEntity accountEntity);

    public void deleteStaff(Long id);

    public List<AccountEntity> geyAllStaff();

    public List<AccountEntity> searchStaff(String keyword);

    public List<AccountEntity> filterStaff(String status);
}
