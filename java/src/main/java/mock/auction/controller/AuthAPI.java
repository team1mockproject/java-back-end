package mock.auction.controller;


import lombok.AllArgsConstructor;
import mock.auction.model.auth.AuthRequest;
import mock.auction.model.auth.AuthRespone;
import mock.auction.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/authenticate")
public class AuthAPI {
    private AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<AuthRespone> authenticateUser(@RequestBody AuthRequest authRequest) {
        AuthRespone loginResponse = authService.authenticateAndGenerateToken(authRequest.getEmail(),authRequest.getPassWord());
        return ResponseEntity.ok()
                .body(loginResponse);
    }

}
