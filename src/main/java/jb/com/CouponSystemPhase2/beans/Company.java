package jb.com.CouponSystemPhase2.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder



public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment (for SQL)
    @Column(updatable = false)
    private int id;
    @Column(updatable = false)
    @NotBlank (message = "Must have a name")
    private String name;
    @NotBlank(message = "Must have an email")
    private String email;
    @NotBlank(message = "Must have a password")
    private String password;
    @JsonIgnore
    @OneToMany (mappedBy = "company", cascade =  CascadeType.PERSIST) //  companies can't have the same coupons as other companies + mapped by -- > OWN THE RELATION (BETWEEN COMPANY VS COUPONS)
    @Singular // for builder
    @ToString.Exclude // Stack overflow because of circular dependencies between company -- >coupons --> company...
    private List<Coupon> coupons = new ArrayList<>();

}
