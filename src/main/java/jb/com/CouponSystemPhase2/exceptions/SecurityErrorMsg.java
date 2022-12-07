package jb.com.CouponSystemPhase2.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum SecurityErrorMsg {
    EMAIL_ALREADY_EXISTS("This email already exists", HttpStatus.CONFLICT),
    LOGIN_NOT_FOUND("Login info incorrect", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN("invalid token! please log in again", HttpStatus.UNAUTHORIZED);
    private String msg;
    private HttpStatus status;

    SecurityErrorMsg(String msg, HttpStatus status) {
        this.msg = msg;
        this.status = status;
    }
}
