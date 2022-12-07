package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.exceptions.ErrorMsg;
import jb.com.CouponSystemPhase2.exceptions.SecurityErrorMsg;
import jb.com.CouponSystemPhase2.security.ClientType;
import jb.com.CouponSystemPhase2.security.TokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@RequiredArgsConstructor
public class CustomerServiceImpl extends ClientService implements CustomerService {
    private static int customerId;
  private final TokenManager tokenManager;

    @Override
    //  -PROTO Bad forSpring Container - just for phase 2 - SINGLE WILL OVERWRITE LAST ENTRY
    public UUID login(String email, String password) throws CouponSecurityException, CouponSystemException {
        if (!customerRepository.existsByEmailAndPassword(email, password)) {
            throw new CouponSecurityException(SecurityErrorMsg.LOGIN_NOT_FOUND);
        }
        customerId = customerRepository.getIdByEmailAndPassword(email, password);
        UUID token = tokenManager.saveToken(email,customerId, ClientType.CUSTOMER);
        return token;
    }

    @Override
    public void purchaseCoupon(Coupon coupon, int customerId) throws CouponSystemException {
        if (!couponRepository.existsById(coupon.getId())) {
            throw new CouponSystemException(ErrorMsg.COUPON_NOT_FOUND);
        }
        if (coupon.getAmount() <= 0) {
            throw new CouponSystemException(ErrorMsg.AMOUNT_TOO_SMALL);
        }
        if (Date.valueOf(LocalDate.now()).compareTo(coupon.getEndDate()) > 0) {
            throw new CouponSystemException(ErrorMsg.COUPON_EXPIRED);
        }
        coupon.setAmount(coupon.getAmount() - 1);
        couponRepository.saveAndFlush(coupon);
        Customer customer = customerRepository.findCustomerById(customerId);
        Set<Coupon> coupons = customer.getCoupons();
        coupons.add(coupon);
        customer.setCoupons(coupons);
        customerRepository.saveAndFlush(customer);
    }

    @Override
    public List<Coupon> getAllCoupons(int customerId) throws CouponSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new CouponSystemException(ErrorMsg.ID_NOT_FOUND);
        }
        return couponRepository.getCustomerCoupons(customerId);

    }


    @Override
    public List<Coupon> getAllCouponsByCategory(int customerId, Category category) throws CouponSystemException {
        if (!couponRepository.existsByCategory(category)) {
            throw new CouponSystemException(ErrorMsg.CATEGORY_NOT_EXIST);
        }
       return couponRepository.getCustomerCouponsByCategory(customerId, category.toString());
    }

    @Override
    public List<Coupon>  getAllCouponsByMaxPrice(int customerId, double maxPrice)  {


        return couponRepository.findCustomerCouponsByMaxPrice(customerId, maxPrice);

    }

    @Override
    public Optional<Customer> getCustomerInfo(int customerId)  {
        return customerRepository.findById(customerId);
    }


}
