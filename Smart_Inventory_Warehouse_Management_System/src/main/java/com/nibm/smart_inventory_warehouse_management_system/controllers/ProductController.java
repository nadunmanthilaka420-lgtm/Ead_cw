package com.nibm.smart_inventory_warehouse_management_system.controllers;

import com.nibm.smart_inventory_warehouse_management_system.entities.Product;
import com.nibm.smart_inventory_warehouse_management_system.services.ProductService;
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
@RequestMapping("/api/products")
@CrossOrigin("*")
@Tag(name = "2. Products", description = "Operations for registering, retrieving, updating, and removing warehouse products")
public class ProductController {
    @Autowired
    private ProductService service;

    @PostMapping
    @Operation(summary = "Create or update a product", description = "Registers a new product or updates an existing product. Access requires authentication.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product saved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request body payload",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Fetches a full list of all products in the warehouse inventory.")
    @ApiResponse(responseCode = "200", description = "List of products retrieved successfully")
    public List<Product> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieves information about a specific product using its unique database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found and returned",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "404", description = "Product not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public Product getById(
            @Parameter(description = "Database ID of the product", example = "1", required = true)
            @PathVariable Long id){
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product by ID", description = "Deletes a product record permanently from the warehouse database using its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found with specified ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public void delete(
            @Parameter(description = "Database ID of the product to delete", example = "1", required = true)
            @PathVariable Long id){
        service.delete(id);
    }
}
