package com.mockproject.auction.entity;

import jakarta.persistence.*;

import java.sql.Date;

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

    public CustomerSupport() {
    }

    public Integer getCustomerSupportId() {
        return customerSupportId;
    }

    public void setCustomerSupportId(Integer customerSupportId) {
        this.customerSupportId = customerSupportId;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(Date resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public AccountEntity getCustomer() {
        return customer;
    }

    public void setCustomer(AccountEntity customer) {
        this.customer = customer;
    }

    public AccountEntity getStaff() {
        return staff;
    }

    public void setStaff(AccountEntity staff) {
        this.staff = staff;
    }
}
