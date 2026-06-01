package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.dto.AuthRequest;
import com.nibm.smart_inventory_warehouse_management_system.dto.AuthResponse;
import com.nibm.smart_inventory_warehouse_management_system.entities.User;
import com.nibm.smart_inventory_warehouse_management_system.repositories.UserRepository;
import com.nibm.smart_inventory_warehouse_management_system.security.JwtService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    private final UserRepository repository;
    private final JwtService jwtService;

    public AuthController(UserRepository repository,
                          JwtService jwtService) {

        this.repository = repository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return repository.save(user);
    }
    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody AuthRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElseThrow();

        if (!user.getPassword()
                .equals(request.getPassword())) {

            throw new RuntimeException(
                    "Invalid Password");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new AuthResponse(token);
    }


}
