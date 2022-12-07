package jb.com.CouponSystemPhase2.advice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrDTO {
    private final String key = "CouponSystem";
    private String value;
}
