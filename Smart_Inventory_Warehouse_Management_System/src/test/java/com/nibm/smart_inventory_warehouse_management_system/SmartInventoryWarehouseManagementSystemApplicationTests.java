package com.nibm.smart_inventory_warehouse_management_system;

import com.nibm.smart_inventory_warehouse_management_system.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SmartInventoryWarehouseManagementSystemApplicationTests {

    @Autowired
    private JwtService jwtService;

    @Test
    void contextLoads() {
    }

    @Test
    void testJwtService() {
        String email = "test@example.com";
        String token = jwtService.generateToken(email);
        assertNotNull(token);
        
        String extractedEmail = jwtService.extractUsername(token);
        assertEquals(email, extractedEmail);
    }

}

