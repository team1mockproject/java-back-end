package mock.auction.model.asset;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class AssetImg {
    private List<MultipartFile> assetFiles;
}
