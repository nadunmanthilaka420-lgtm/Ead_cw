package com.nibm.smart_inventory_warehouse_management_system.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Supplier entity representing product vendors")
public class supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique ID of the supplier", example = "1")
    private Long supplierId;

    @Schema(description = "Name of the supplier company/person", example = "Logitech Global Corp", requiredMode = Schema.RequiredMode.REQUIRED)
    private String supplierName;

    @Schema(description = "Phone number of the supplier", example = "+94112345678")
    private String phone;

    @Schema(description = "Address of the supplier", example = "No. 45, Galle Road, Colombo 03")
    private String address;

    @Schema(description = "Email address of the supplier", example = "sales@logitech.com")
    private String email;
}