package jb.com.CouponSystemPhase2.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.sql.Date;

@Entity
@Table(name = "coupons")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment (for SQL)
    private int id;
    @Enumerated(EnumType.STRING)
    private Category category;
    @ManyToOne
    private Company company;
    @NotBlank (message = "Must have a title")
    private String title;
    @NotBlank (message = "Must have a description")
    private String description;
    private Date startDate;
    private Date endDate;
    @Min(0)
    private int amount;
    @Min(0)
    private double price;
    @NotBlank (message = "Must have an image URL")
    private String image;
}
