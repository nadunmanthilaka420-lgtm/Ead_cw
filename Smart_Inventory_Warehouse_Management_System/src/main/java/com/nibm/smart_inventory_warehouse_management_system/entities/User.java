package com.nibm.smart_inventory_warehouse_management_system.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User entity representing warehouse personnel")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the user", example = "1")
    private Long id;

    @Schema(description = "Name of the user", example = "Nadun Manthilaka", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Column(unique = true)
    @Schema(description = "Unique email address used for login", example = "nadun@warehouse.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "User password", example = "secret123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    @Schema(description = "Role assigned to the user", example = "ADMIN", allowableValues = {"ADMIN", "USER"})
    private String role;
}
