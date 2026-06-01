package com.nibm.smart_inventory_warehouse_management_system.services;

import com.nibm.smart_inventory_warehouse_management_system.entities.Stock;
import com.nibm.smart_inventory_warehouse_management_system.repositories.StockRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Service
public class StockService {
    @Autowired
    private StockRepository repository;

    public Stock save(Stock stock) {
        return repository.save(stock);
    }

    public List<Stock> getAll() {
        return repository.findAll();
    }

    public Stock getById(Long id) {
        return repository.findById(id).orElse(null);
    }
    public Stock update(Long id, Stock stockDetails) {
        Stock stock = repository.findById(id).orElse(null);

        if (stock != null) {
            stock.setQuantityAvailable(stockDetails.getQuantityAvailable());
            stock.setMinimumLevel(stockDetails.getMinimumLevel());
            stock.setWarehouseLocation(stockDetails.getWarehouseLocation());
            stock.setProduct(stockDetails.getProduct());

            return repository.save(stock);
        }

        return null;
    }
    public void delete(Long id) {
        repository.deleteById(id);
    }

}
