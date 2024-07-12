package mock.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mock.auction.entity.AccountEntity;
import mock.auction.service.AccountServiceInterface;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/staff")
public class AccountController {

    private AccountServiceInterface accountService;

    @Autowired
    public AccountController(AccountServiceInterface accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/add")
    public ResponseEntity<AccountEntity> addUser(@RequestBody AccountEntity accountEntity,
            @RequestParam Set<Integer> roleIds) {
        AccountEntity newStaff = accountService.addStaff(accountEntity, roleIds);
        return ResponseEntity.ok(newStaff);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AccountEntity> updateUser(@PathVariable Integer id,
            @RequestBody AccountEntity accountEntity) {
        return ResponseEntity.ok(accountService.updateStaff(id, accountEntity));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        accountService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    // API cho Staff
    @GetMapping("/allStaff")
    public ResponseEntity<List<AccountEntity>> getAllStaff() {
        List<AccountEntity> allStaff = accountService.getAllStaff();
        return ResponseEntity.ok(allStaff);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<AccountEntity>> filterStaff(@RequestParam String status) {
        return ResponseEntity.ok(accountService.filterStaff(status));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AccountEntity>> searchStaff(@RequestParam String keyword) {
        List<AccountEntity> searchResults = accountService.searchStaff(keyword);
        return ResponseEntity.ok(searchResults);
    }
}
