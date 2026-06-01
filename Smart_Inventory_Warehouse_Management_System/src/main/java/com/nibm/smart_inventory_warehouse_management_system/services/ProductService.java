package com.nibm.smart_inventory_warehouse_management_system.services;

import com.nibm.smart_inventory_warehouse_management_system.entities.Product;
import com.nibm.smart_inventory_warehouse_management_system.exceptions.ResourceNotFoundException;
import com.nibm.smart_inventory_warehouse_management_system.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public Product save(Product product){
        return repository.save(product);
    }

    public List<Product> getAll(){
        return repository.findAll();
    }

    public Product getById(Long id){
        return repository.findById(id).orElseThrow(()->
        new ResourceNotFoundException("Product not found with id "+id));
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}
