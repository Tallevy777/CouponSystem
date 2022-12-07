package jb.com.CouponSystemPhase2.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(updatable = false)
    private int id;
    @NotBlank (message = "Must have a first name")
    private String firstName;
    @NotBlank(message = "Must have a last name")
    private String lastName;
    @NotBlank(message = "Must have an email name")
    private String email;
    @NotBlank(message = "Must have a password name")
    private String password;
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "customers_coupons",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn (name = "coupons_id"))
    @Singular // for builder
    @ToString.Exclude
    @JsonIgnore
    private Set<Coupon> coupons = new HashSet<>();
}
