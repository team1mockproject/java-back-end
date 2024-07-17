package mock.auction.test;

import mock.auction.entity.LocationEntity;
import mock.auction.exception.ComponentException;
import mock.auction.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
public class TestLocationRepository {
    @Autowired
    private LocationRepository locationRepository;

    @Test
    public void getById(){
        LocationEntity location = locationRepository.findById(1).orElseThrow(()->new ComponentException("ID location not found",
                HttpStatus.BAD_REQUEST));;
        System.out.println(location);
    }
}
