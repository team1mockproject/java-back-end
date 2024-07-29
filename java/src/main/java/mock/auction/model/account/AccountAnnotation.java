package mock.auction.model.account;

import mock.auction.entity.AccountEntity;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface AccountAnnotation {
    Class<AccountEntity> entityClass();
    Class<AccountDto> dtoClass();
}
