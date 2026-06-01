package com.nibm.smart_inventory_warehouse_management_system.services;

import com.nibm.smart_inventory_warehouse_management_system.entities.Order;
import com.nibm.smart_inventory_warehouse_management_system.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;

    public Order save(Order order) {
        return repository.save(order);
    }

    public List<Order> getAll() {
        return repository.findAll();
    }

    public Order getById(Long id) {
        return repository.findById(id).orElse(null);
    }
    public Order update(Long id, Order orderDetails) {

        Order order = repository.findById(id).orElse(null);

        if (order != null) {
            order.setOrderDate(orderDetails.getOrderDate());
            order.setStatus(orderDetails.getStatus());
            order.setTotalAmount(orderDetails.getTotalAmount());
            order.setProduct(orderDetails.getProduct());

            return repository.save(order);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}
