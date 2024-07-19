package mock.auction.service.impl;

import lombok.AllArgsConstructor;
import mock.auction.exception.DisableAccountException;
import mock.auction.model.auth.AuthRespone;
import mock.auction.security.UserDetailsServiceImpl;
import mock.auction.service.AuthService;
import mock.auction.utils.JwtTokenUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private JwtTokenUtil jwtTokenUtil;
    private UserDetailsServiceImpl userDetailService;
    private PasswordEncoder passwordEncoder;

    @Override
    public AuthRespone authenticateAndGenerateToken(String userName, String passWord) {
        UserDetails userDetails = userDetailService.loadUserByUsername(userName);
        //check password
        if (!passwordEncoder.matches(passWord, userDetails.getPassword())) {
            throw new BadCredentialsException("Login information is incorrect!");
        }
        //check status account
        if (!userDetails.isEnabled()) {
            throw new DisableAccountException("Account disable!");
        }
        String accessToken = jwtTokenUtil.generateToken(userDetails);
        return AuthRespone.builder()
                .accessToken(accessToken)
                .build();
    }
}
