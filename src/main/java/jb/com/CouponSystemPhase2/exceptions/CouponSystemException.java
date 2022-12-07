package jb.com.CouponSystemPhase2.exceptions;

public class CouponSystemException extends Exception {
    public CouponSystemException(ErrorMsg errorMsg) {
        super(errorMsg.getMsg());
    }

}
