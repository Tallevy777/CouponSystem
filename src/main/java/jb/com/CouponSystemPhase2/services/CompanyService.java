package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
   void addCoupon(int companyId,Coupon coupon) throws CouponSystemException;
   void updateCoupon(int companyId, int couponId, Coupon coupon) throws CouponSystemException;
   void deleteCoupon(int companyId, int couponId) throws CouponSystemException;
   List<Coupon> getAllCouponsByCategory( int companyId, Category category) throws CouponSystemException;
   List<Coupon> getAllCouponsByMaxPrice(int companyId, double maxPrice) throws CouponSystemException;
   Optional<Company> getCompanyInfo(int companyId) throws CouponSystemException;
   Optional<Coupon> getCoupon(int companyId, int couponId) throws CouponSystemException;
   List<Coupon> getAllCoupons(int companyId);
}
