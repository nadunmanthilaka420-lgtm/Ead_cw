package com.nibm.smart_inventory_warehouse_management_system.exceptions;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@Schema(description = "Standardized structure for error and exception responses")
public class ErrorResponse {
    @Schema(description = "Timestamp when the error occurred", example = "2026-06-02T19:58:20.123Z")
    private LocalDateTime timestamp;

    @Schema(description = "HTTP status code", example = "404")
    private int status;

    @Schema(description = "Short error definition", example = "Not Found")
    private String error;

    @Schema(description = "Detailed error message", example = "Product not found with id: 12")
    private String message;
}
