package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * RoleEntity
 * 
 * Version 1.0
 * 
 * Date: 13-07-2024
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE         AUTHOR          DESCRIPTION
 * ----------------------------------------
 * ??-??-2024   Bảo             Create
 * 13-07-2024   kiet-kun-afk    Update
 */
@Entity
@Table(name = "Role")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int id;
    private String name;

    public RoleEntity(String name) {
        this.name = name;
    }
}
