package jb.com.CouponSystemPhase2.exceptions;

import lombok.Getter;

@Getter
public enum ErrorMsg {

    ID_NOT_FOUND("Id not found"),
    ID_ALREADY_EXISTS("Id Already Exists"),
    COMPANY_NAME_ALREADY_EXISTS("Company Name Already Exists"),
    COMPANY_EMAIL_ALREADY_EXISTS("Company Email Already Exists"),
    COMPANY_ID_DOES_NOT_EXIST("Company Id Does not Exist"),
    CUSTOMER_EMAIL_ALREADY_EXIST("Customer Email Already Exists"),
    CUSTOMER_NAME_ALREADY_EXISTS("This Customer Name is Already in Use!"),
    CUSTOMER_ID_NOT_EXIST("Customer Id Does not Exist"),
    LOGIN_NOT_FOUND("Login Information is Incorrect!"),
    COUPON_TITLE_EXISTS("Coupon Title Already Exists"),
    COUPON_NOT_FOUND("Coupon Was not Found"),
    COUPON_ALREADY_EXIST("Can only own one of each coupon"),
    AMOUNT_TOO_SMALL("Sorry there are no more coupons left!"),
    CATEGORY_NOT_EXIST("Coupon not found for the specific category"),
    COUPON_EXPIRED("Sorry this coupon just expired!");


    private String msg;

    ErrorMsg(String msg) {
        this.msg = msg;
    }
}
