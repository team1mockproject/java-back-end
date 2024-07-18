package mock.auction.service;

import org.springframework.stereotype.Service;

import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.account.SlipConfirm;

import java.util.List;

@Service
public interface AccountServiceInterface extends GenericService<AccountDto, AccountEntity> {
    public AccountEntity addStaff(AccountEntity accountEntity);

    public AccountEntity updateStaff(Integer id, AccountEntity accountEntity);

    public void deleteStaff(Integer id);

    public List<AccountEntity> getAllStaff();

    public List<AccountEntity> searchStaff(String keyword);

    public List<AccountEntity> filterStaff(String status);

    BaseResponse acceptOrReject(SlipConfirm slipConfirm);

    public void reActive(Integer id) throws Exception;

}
