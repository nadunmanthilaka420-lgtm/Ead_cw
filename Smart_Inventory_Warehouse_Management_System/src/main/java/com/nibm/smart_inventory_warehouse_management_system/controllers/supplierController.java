package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.supplier;
import com.nibm.smart_inventory_warehouse_management_system.services.supplierService;
import com.nibm.smart_inventory_warehouse_management_system.exceptions.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/suppliers")
@Tag(name = "3. Suppliers", description = "Operations for registering, retrieving, and removing product suppliers")
public class supplierController {
    private final supplierService service;

    public supplierController(supplierService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Save a supplier", description = "Creates a new supplier or updates an existing supplier record. Authentication required.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Supplier saved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = supplier.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request payload provided",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public supplier save(@RequestBody supplier supplier) {
        return service.save(supplier);
    }

    @GetMapping
    @Operation(summary = "Get all suppliers", description = "Retrieves a list of all product suppliers in the system.")
    @ApiResponse(responseCode = "200", description = "List of suppliers successfully retrieved")
    public List<supplier> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get supplier by ID", description = "Retrieves details of a specific supplier using their unique database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Supplier found and returned",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = supplier.class))),
            @ApiResponse(responseCode = "404", description = "Supplier not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public supplier getById(
            @Parameter(description = "Database ID of the supplier", example = "1", required = true)
            @PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete supplier by ID", description = "Removes a supplier permanently from the warehouse database using their ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Supplier successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Supplier not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public void delete(
            @Parameter(description = "Database ID of the supplier to delete", example = "1", required = true)
            @PathVariable Long id) {
        service.delete(id);
    }
}
