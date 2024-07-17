package mock.auction.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Component
public class CloudinaryUtil {
    @Value("${com.app.cloudinary.rootFolder}")
    private String rootFolder;
    private final Cloudinary cloudinary;

    public CloudinaryUtil(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String upload(MultipartFile file, String folder) {
        try {
            Map params = ObjectUtils.asMap(
                    "use_filename", true,
                    "unique_filename", true,
                    "folder", rootFolder + "/" + folder
            );
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
            return uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
