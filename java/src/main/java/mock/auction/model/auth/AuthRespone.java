package mock.auction.model.auth;

import lombok.*;
import org.springframework.http.ResponseCookie;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRespone {
    private String accessToken;
    private final String type = "Bearer ";
}
