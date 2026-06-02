package com.nibm.smart_inventory_warehouse_management_system.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Product entity representing warehouse stock items")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique ID of the product", example = "1")
    private Long productId;

    @Schema(description = "Name of the product", example = "Wireless Mouse Logi", requiredMode = Schema.RequiredMode.REQUIRED)
    private String productName;

    @Schema(description = "Category class of the product", example = "Electronics", requiredMode = Schema.RequiredMode.REQUIRED)
    private String category;

    @Schema(description = "Unit price of the product", example = "29.99", requiredMode = Schema.RequiredMode.REQUIRED)
    private Double price;

    @Schema(description = "Brief description of the product", example = "Ergonomic 2.4GHz wireless mouse")
    private String description;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @Schema(description = "Associated supplier of this product")
    private supplier supplier;
}
