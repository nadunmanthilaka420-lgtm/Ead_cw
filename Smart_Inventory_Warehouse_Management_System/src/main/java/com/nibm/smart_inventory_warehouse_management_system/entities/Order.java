package com.nibm.smart_inventory_warehouse_management_system.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private LocalDate orderDate;

    private String status;

    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
