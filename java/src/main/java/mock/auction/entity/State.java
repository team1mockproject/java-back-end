package mock.auction.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "State")
public class State {
    @Id
    @Column(name = "state_code", length = 10, nullable = false)
    private String stateCode;

    @Column(name = "state_name", nullable = false)
    private String stateName;
}
