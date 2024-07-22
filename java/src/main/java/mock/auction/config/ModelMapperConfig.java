package mock.auction.config;

import mock.auction.entity.AccountEntity;
import mock.auction.entity.Asset;
import mock.auction.model.account.AccountDto;
import mock.auction.model.asset.AssetDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper getModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        TypeMap<AssetDto, Asset>assetTypeMap = modelMapper.createTypeMap(AssetDto.class,Asset.class);
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        assetTypeMap.addMappings(mapper->{
            mapper.skip(Asset::setAssessmentDate);
            mapper.skip(Asset::setAssessmentReport);
            mapper.skip(Asset::setAssetFiles);
        });
        return modelMapper;
    }
}
