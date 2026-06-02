package com.nibm.smart_inventory_warehouse_management_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request body for user authentication")
public class AuthRequest {
    @Schema(description = "User's email address", example = "admin@warehouse.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "User's secret password", example = "admin123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;
}
