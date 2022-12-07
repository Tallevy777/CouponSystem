package jb.com.CouponSystemPhase2.exceptions;

import lombok.Data;

@Data
public class CouponSecurityException extends Exception {
    private SecurityErrorMsg securityErrorMsg;
    public CouponSecurityException(SecurityErrorMsg securityErrorMsg) {
       super(securityErrorMsg.getMsg());
       this.securityErrorMsg = securityErrorMsg;
    }
}

