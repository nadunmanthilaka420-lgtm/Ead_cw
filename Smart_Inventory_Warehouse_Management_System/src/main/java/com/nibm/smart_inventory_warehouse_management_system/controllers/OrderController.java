package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Order;
import com.nibm.smart_inventory_warehouse_management_system.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping
    public Order save(@RequestBody Order order) {
        return service.save(order);
    }

    @GetMapping
    public List<Order> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return service.getById(id);
    }
    @PutMapping("/{id}")
    public Order update(@PathVariable Long id,
                         @RequestBody Order order) {
        return service.update(id, order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
