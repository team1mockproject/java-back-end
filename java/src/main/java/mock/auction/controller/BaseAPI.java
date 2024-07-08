package mock.auction.controller;

import mock.auction.service.GenericService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class BaseAPI <TDto ,TEntity >{
    private GenericService<TDto,TEntity> service;
    public BaseAPI(GenericService<TDto,TEntity> service){
        this.service = service;
    }
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody TDto dto){
        return ResponseEntity.ok(service.save(dto));
    }

}
