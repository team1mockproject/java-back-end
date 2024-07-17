package mock.auction.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${com.app.cloudinary.name}")
    private String cloudName;
    @Value("${com.app.cloudinary.apiKey}")
    private String apiKey;
    @Value("${com.app.cloudinary.apiSecret}")
    private String apiSecret;

    @Bean
    Cloudinary cloudinary() {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true));
        return cloudinary;
    }
}
