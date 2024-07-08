package mock.auction.controller;

import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.account.AccountAnnotation;
import mock.auction.model.account.AccountDto;
import mock.auction.service.impl.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account/")
public class AccountAPI extends BaseAPI<AccountDto,AccountEntity>{
    private AccountService accountService;
    public AccountAPI(AccountService accountService){
        super(accountService);
        this.accountService = accountService;
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<BaseResponse> create(AccountDto accountDto) {
        return ResponseEntity.ok(accountService.save(accountDto));
    }
}
