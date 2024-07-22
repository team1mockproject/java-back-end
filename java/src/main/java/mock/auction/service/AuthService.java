package mock.auction.service;

import mock.auction.entity.AccountEntity;
import mock.auction.model.auth.AuthRespone;

public interface AuthService {
    AuthRespone authenticateAndGenerateToken(String userName, String passWord);

    AccountEntity getAuth() throws Exception;
}
