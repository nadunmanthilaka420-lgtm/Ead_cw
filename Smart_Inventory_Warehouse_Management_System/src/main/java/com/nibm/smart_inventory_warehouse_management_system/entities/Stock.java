package com.nibm.smart_inventory_warehouse_management_system.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Stock entity representing inventory quantities and location")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique ID of the stock record", example = "1")
    private Long stockId;

    @Schema(description = "Current quantity of the product available in stock", example = "150", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer quantityAvailable;

    @Schema(description = "Minimum stock level for trigger alerts", example = "20", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer minimumLevel;

    @Schema(description = "Location inside the warehouse storage", example = "Shelf A, Row 4", requiredMode = Schema.RequiredMode.REQUIRED)
    private String warehouseLocation;

    @OneToOne
    @JoinColumn(name = "product_id")
    @Schema(description = "Associated product for this stock record")
    private Product product;
}
