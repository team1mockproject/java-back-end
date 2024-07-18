package mock.auction.controller;

import jakarta.annotation.Nullable;
import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.account.SlipConfirm;
import mock.auction.service.AccountService;
import mock.auction.service.impl.AccountServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account/")
public class AccountAPI extends BaseAPI<AccountDto,AccountEntity>{
    private AccountService accountService;
    public AccountAPI(AccountServiceImp accountServiceImp){
        super(accountServiceImp);
        this.accountService = accountServiceImp;
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<AccountDto>> getAllResources(int page, int size, String sort, @Nullable String filter, @Nullable String search, boolean all) {
        return ResponseEntity.ok(
                accountService.findAll(page, size, sort, filter, search, all));
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<BaseResponse> create(AccountDto accountDto) {
        return ResponseEntity.ok(accountService.save(accountDto));
    }

    @PostMapping("/confirm")
    public ResponseEntity<BaseResponse> confirm(@RequestBody SlipConfirm slipConfirm){
        return ResponseEntity.ok(accountService.enableDOrDisabled(slipConfirm));
    }

    @PutMapping("/update")
    public ResponseEntity<BaseResponse> update(@RequestBody AccountDto accountDto){
        return ResponseEntity.ok(accountService.save(accountDto));
    }
}
