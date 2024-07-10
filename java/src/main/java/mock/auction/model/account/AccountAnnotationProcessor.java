//package mock.auction.model.account;
//
//import mock.auction.entity.AccountEntity;
//
//import javax.annotation.processing.AbstractProcessor;
//import javax.annotation.processing.RoundEnvironment;
//import javax.annotation.processing.SupportedAnnotationTypes;
//import javax.annotation.processing.SupportedSourceVersion;
//import javax.lang.model.SourceVersion;
//import javax.lang.model.element.Element;
//import javax.lang.model.element.TypeElement;
//import java.util.Set;
//
//@SupportedAnnotationTypes("AccountAnnotation")
//@SupportedSourceVersion(SourceVersion.RELEASE_8)
//public class AccountAnnotationProcessor extends AbstractProcessor {
//    @Override
//    public boolean process(Set<?extends TypeElement> annotations,
//                           RoundEnvironment roundEnv){
//        for(Element element : roundEnv.getElementsAnnotatedWith(AccountAnnotation.class)){
//            AccountAnnotation annotation = element.getAnnotation(AccountAnnotation.class);
//            Class<AccountDto> accountDto = annotation.dtoClass();
//            Class<AccountEntity> accountEntity = annotation.entityClass();
//
//        }
//    }
//}
