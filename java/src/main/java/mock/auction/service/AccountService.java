package mock.auction.service;

import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.account.SlipConfirm;

public interface AccountService extends GenericService<AccountDto, AccountEntity>{
    BaseResponse enableDOrDisabled(SlipConfirm slipConfirm);
}
