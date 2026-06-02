package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.dto.AuthRequest;
import com.nibm.smart_inventory_warehouse_management_system.dto.AuthResponse;
import com.nibm.smart_inventory_warehouse_management_system.entities.User;
import com.nibm.smart_inventory_warehouse_management_system.repositories.UserRepository;
import com.nibm.smart_inventory_warehouse_management_system.security.JwtService;
import com.nibm.smart_inventory_warehouse_management_system.exceptions.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@Tag(name = "1. Authentication", description = "Operations for user registration and credential-based login")
public class AuthController {
    private final UserRepository repository;
    private final JwtService jwtService;

    public AuthController(UserRepository repository,
                          JwtService jwtService) {

        this.repository = repository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account with specified name, email, password, and role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User successfully registered",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Invalid registration payload provided",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "User with this email already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public User register(@RequestBody User user) {

        return repository.save(user);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Validates user credentials (email/password) and generates a JWT Bearer token upon success.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful, Bearer token returned",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "401", description = "Invalid email or password",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
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

        return new AuthResponse(token, user.getRole());
    }
}
