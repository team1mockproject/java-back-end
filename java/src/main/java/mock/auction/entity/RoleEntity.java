package mock.auction.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private int role_id;
    private String name;
}
