package mock.auction.controller;

import jakarta.annotation.Nullable;
import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.account.AccountAnnotation;
import mock.auction.model.account.AccountDto;
import mock.auction.service.impl.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authenticate/account")
public class AccountAPI extends BaseAPI<AccountDto, AccountEntity> {
    private AccountService accountService;

    public AccountAPI(AccountService accountService) {
        super(accountService);
        this.accountService = accountService;
    }

    @Override
    @GetMapping
    public ResponseEntity<ListResponse<AccountDto>> getAllResources(int page, int size, String sort,
            @Nullable String filter, @Nullable String search, boolean all) {
        return ResponseEntity.ok(
                accountService.findAll(page, size, sort, filter, search, all));
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<BaseResponse> create(AccountDto accountDto) {
        return ResponseEntity.ok(accountService.save(accountDto));
    }
}
