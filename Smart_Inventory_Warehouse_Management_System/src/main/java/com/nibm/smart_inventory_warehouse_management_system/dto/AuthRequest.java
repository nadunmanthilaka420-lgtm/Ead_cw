package com.nibm.smart_inventory_warehouse_management_system.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
