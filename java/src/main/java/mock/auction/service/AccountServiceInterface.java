package mock.auction.service;

import org.springframework.stereotype.Service;

import mock.auction.entity.AccountEntity;

import java.util.List;
import java.util.Set;

@Service
public interface AccountServiceInterface {
    public AccountEntity addStaff(AccountEntity accountEntity, Set<Integer> roleIds);

    public AccountEntity updateStaff(Integer id, AccountEntity accountEntity);

    public void deleteStaff(Integer id);

    public List<AccountEntity> getAllStaff();

    public List<AccountEntity> searchStaff(String keyword);

    public List<AccountEntity> filterStaff(String status);
}
