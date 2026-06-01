package com.nibm.smart_inventory_warehouse_management_system.services;

import com.nibm.smart_inventory_warehouse_management_system.entities.supplier;
import com.nibm.smart_inventory_warehouse_management_system.repositories.supplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class supplierService {
    private final supplierRepository repository;

    public supplierService(supplierRepository repository) {
        this.repository = repository;
    }

    public supplier save(supplier supplier) {
        return repository.save(supplier);
    }

    public List<supplier> getAll() {
        return repository.findAll();
    }

    public supplier getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
