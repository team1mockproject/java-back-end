package mock.auction.controller;

import jakarta.annotation.Nullable;
import mock.auction.entity.AccountEntity;
import mock.auction.model.BaseResponse;
import mock.auction.model.ListResponse;
import mock.auction.model.account.AccountDto;
import mock.auction.model.account.SlipConfirm;
import mock.auction.service.AccountServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account/")
public class AccountAPI extends BaseAPI<AccountDto,AccountEntity>{
    private AccountService accountService;
    public AccountAPI(AccountServiceInterface accountService){
        super(accountServiceImp);
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
    public ResponseEntity<BaseResponse> create(AccountDto accountDto, BindingResult bindingResult) {
        try {
            return ResponseEntity.ok(accountService.save(accountDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder().code(400).data(e.getMessage()).message("register failed").build());
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<BaseResponse> confirm(@RequestBody SlipConfirm slipConfirm) {
        return ResponseEntity.ok(accountService.acceptOrReject(slipConfirm));
    }

    @PostMapping("/confirm")
    public ResponseEntity<BaseResponse> confirm(@RequestBody SlipConfirm slipConfirm){
        return ResponseEntity.ok(accountService.acceptOrReject(slipConfirm));
    }
}
