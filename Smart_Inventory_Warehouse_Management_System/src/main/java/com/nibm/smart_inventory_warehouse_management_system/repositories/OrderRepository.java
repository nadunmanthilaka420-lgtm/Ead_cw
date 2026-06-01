package com.nibm.smart_inventory_warehouse_management_system.repositories;
import com.nibm.smart_inventory_warehouse_management_system.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Long> {
}
