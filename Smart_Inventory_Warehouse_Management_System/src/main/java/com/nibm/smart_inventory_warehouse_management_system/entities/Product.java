package com.nibm.smart_inventory_warehouse_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;

    private String category;

    private Double price;

    private String description;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private supplier supplier;
}
