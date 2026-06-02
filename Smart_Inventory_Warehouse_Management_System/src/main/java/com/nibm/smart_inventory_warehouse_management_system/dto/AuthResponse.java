package com.nibm.smart_inventory_warehouse_management_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Response containing the authentication token and user details")
public class AuthResponse {
    @Schema(description = "JWT Bearer token for accessing secured endpoints", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    @Schema(description = "The role assigned to the authenticated user", example = "ADMIN")
    private String role;
}
