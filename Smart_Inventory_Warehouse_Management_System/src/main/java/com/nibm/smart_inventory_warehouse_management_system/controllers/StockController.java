package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Stock;
import com.nibm.smart_inventory_warehouse_management_system.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/stocks")
@CrossOrigin("*")
public class StockController {
    @Autowired
    private StockService service;

    @PostMapping
    public Stock save(@RequestBody Stock stock) {
        return service.save(stock);
    }

    @GetMapping
    public List<Stock> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Stock getById(@PathVariable Long id) {
        return service.getById(id);
    }
    @PutMapping("/{id}")
    public Stock update(@PathVariable Long id,
                        @RequestBody Stock stock) {
        return service.update(id, stock);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
