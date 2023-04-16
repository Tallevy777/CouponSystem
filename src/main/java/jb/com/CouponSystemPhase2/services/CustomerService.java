package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    void purchaseCoupon (Coupon coupon,int customerId) throws CouponSystemException;
    List<Coupon> getAllCustomerCoupons(int customerId) throws CouponSystemException;
    List<Coupon> getAllCouponsByCategory(int customerId, Category category) throws CouponSystemException;
    List<Coupon> getAllCouponsByMaxPrice(int customerId, double maxPrice) throws CouponSystemException;
    Optional<Customer> getCustomerInfo(int customerId) throws CouponSystemException;
    List<Coupon> getAllCoupons(int customerId);

}
