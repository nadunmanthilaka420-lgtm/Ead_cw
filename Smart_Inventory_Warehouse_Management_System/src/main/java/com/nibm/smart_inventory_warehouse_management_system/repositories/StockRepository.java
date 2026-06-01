package com.nibm.smart_inventory_warehouse_management_system.repositories;
import com.nibm.smart_inventory_warehouse_management_system.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
