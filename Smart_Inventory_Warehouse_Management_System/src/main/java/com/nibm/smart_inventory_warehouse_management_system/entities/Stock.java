package com.nibm.smart_inventory_warehouse_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    private Integer quantityAvailable;

    private Integer minimumLevel;

    private String warehouseLocation;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
