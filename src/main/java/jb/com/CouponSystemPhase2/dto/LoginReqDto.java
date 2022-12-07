package jb.com.CouponSystemPhase2.dto;

import jb.com.CouponSystemPhase2.security.ClientType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginReqDto {
    @Email
    private String email;

    @Length(min = 3,max = 8)
    private String password;

    @Enumerated(EnumType.STRING) //?
    private ClientType clientType;
}
