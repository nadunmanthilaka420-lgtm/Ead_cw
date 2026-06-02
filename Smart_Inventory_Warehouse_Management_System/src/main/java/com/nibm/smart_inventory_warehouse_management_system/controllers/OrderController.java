package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Order;
import com.nibm.smart_inventory_warehouse_management_system.services.OrderService;
import com.nibm.smart_inventory_warehouse_management_system.exceptions.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
@Tag(name = "5. Orders", description = "Operations for registering, retrieving, updating, and removing warehouse orders")
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping
    @Operation(summary = "Create a new order", description = "Submits a new order transaction for a specific product and updates records. Authentication required.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order saved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
            @ApiResponse(responseCode = "400", description = "Invalid order payload provided",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Order save(@RequestBody Order order) {
        return service.save(order);
    }

    @GetMapping
    @Operation(summary = "Get all orders", description = "Retrieves a list of all order transactions registered in the warehouse.")
    @ApiResponse(responseCode = "200", description = "List of orders successfully retrieved")
    public List<Order> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID", description = "Retrieves transaction details for a specific order using its unique database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order transaction found and returned",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
            @ApiResponse(responseCode = "404", description = "Order not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Order getById(
            @Parameter(description = "Database ID of the order", example = "1", required = true)
            @PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an order", description = "Modifies transaction details of an existing order (e.g. status or amount) by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
            @ApiResponse(responseCode = "404", description = "Order not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Order update(
            @Parameter(description = "Database ID of the order to update", example = "1", required = true)
            @PathVariable Long id,
            @RequestBody Order order) {
        return service.update(id, order);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an order by ID", description = "Permanently removes an order transaction record from the warehouse database using its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Order not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public void delete(
            @Parameter(description = "Database ID of the order to delete", example = "1", required = true)
            @PathVariable Long id) {
        service.delete(id);
    }
}
