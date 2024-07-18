package mock.auction.security;

import lombok.Getter;
import lombok.Setter;
import mock.auction.constants.AppConstants;
import mock.auction.entity.AccountEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class MyUserDetails extends User {
    private int id;

    public MyUserDetails(
            int id,
            String userName,
            String passWord,
            boolean enabled,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities) {
        super(userName, passWord, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.id = id;
    }

    public static UserDetails build(AccountEntity accountEntity) {
        String role = accountEntity.getRoles().toString();
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role));
        return new MyUserDetails(
                accountEntity.getId(),
                accountEntity.getEmail(),
                accountEntity.getPassWord(),
                accountEntity.getStatus().equals(AppConstants.ACTIVE) ? true : false,
                true,
                true,
                true,
                authorities);
    }
}
