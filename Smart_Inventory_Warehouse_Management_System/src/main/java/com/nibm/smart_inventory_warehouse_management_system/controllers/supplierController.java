package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.supplier;
import com.nibm.smart_inventory_warehouse_management_system.services.supplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/suppliers")

public class supplierController {
    private final supplierService service;

    public supplierController(supplierService service) {
        this.service = service;
    }

    @PostMapping
    public supplier save(@RequestBody supplier supplier) {
        return service.save(supplier);
    }

    @GetMapping
    public List<supplier> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public supplier getById(@PathVariable Long id) {
        return service.getById(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
