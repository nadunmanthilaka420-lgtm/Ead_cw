package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Stock;
import com.nibm.smart_inventory_warehouse_management_system.services.StockService;
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
@RequestMapping("/api/stocks")
@CrossOrigin("*")
@Tag(name = "4. Stocks", description = "Operations for monitoring and managing warehouse stock levels")
public class StockController {
    @Autowired
    private StockService service;

    @PostMapping
    @Operation(summary = "Save stock item", description = "Adds a new stock level record to the database or updates an existing one. Requires authentication.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stock saved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Stock.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request payload provided",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Stock save(@RequestBody Stock stock) {
        return service.save(stock);
    }

    @GetMapping
    @Operation(summary = "Get all stocks", description = "Retrieves a list of all stock inventory records inside the warehouse.")
    @ApiResponse(responseCode = "200", description = "List of stock items successfully retrieved")
    public List<Stock> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get stock by ID", description = "Retrieves stock quantity and location details using its unique database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stock item found and returned",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Stock.class))),
            @ApiResponse(responseCode = "404", description = "Stock record not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Stock getById(
            @Parameter(description = "Database ID of the stock record", example = "1", required = true)
            @PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update stock level", description = "Modifies quantity or location of an existing stock record using its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stock level updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Stock.class))),
            @ApiResponse(responseCode = "404", description = "Stock record not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Stock update(
            @Parameter(description = "Database ID of the stock to update", example = "1", required = true)
            @PathVariable Long id,
            @RequestBody Stock stock) {
        return service.update(id, stock);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a stock item", description = "Removes a stock record permanently from the database using its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stock record successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Stock record not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public void delete(
            @Parameter(description = "Database ID of the stock to delete", example = "1", required = true)
            @PathVariable Long id) {
        service.delete(id);
    }
}
