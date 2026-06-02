package com.nibm.smart_inventory_warehouse_management_system.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Order entity representing product transactions")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique ID of the order", example = "1")
    private Long orderId;

    @Schema(description = "Date when the order was placed", example = "2026-06-02", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDate orderDate;

    @Schema(description = "Processing status of the order", example = "PENDING", allowableValues = {"PENDING", "COMPLETED", "CANCELLED"}, requiredMode = Schema.RequiredMode.REQUIRED)
    private String status;

    @Schema(description = "Total cost amount of the order", example = "450.50", requiredMode = Schema.RequiredMode.REQUIRED)
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @Schema(description = "Associated product for this order transaction")
    private Product product;
}
