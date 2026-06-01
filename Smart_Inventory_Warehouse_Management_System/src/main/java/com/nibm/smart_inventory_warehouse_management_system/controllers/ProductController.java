package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Product;
import com.nibm.smart_inventory_warehouse_management_system.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")

public class ProductController {
    @Autowired
    private ProductService service;

    @PostMapping
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

    @GetMapping
    public List<Product> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id){
        return service.getById(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
