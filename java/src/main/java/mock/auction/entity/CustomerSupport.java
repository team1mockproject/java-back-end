package mock.auction.entity;

import jakarta.persistence.*;

import java.sql.Date;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CustomerSupport")
public class CustomerSupport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_support_id")
    private Integer customerSupportId;
    @Column(name = "issue_description")
    private String issueDescription;
    private String status;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "resolved_at")
    private Date resolvedAt;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private AccountEntity customer;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private AccountEntity staff;
}
