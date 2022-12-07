package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.exceptions.ErrorMsg;
import jb.com.CouponSystemPhase2.exceptions.SecurityErrorMsg;
import jb.com.CouponSystemPhase2.security.ClientType;
import jb.com.CouponSystemPhase2.security.TokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl extends ClientService implements CompanyService {

    private static int companyId;
    private final TokenManager tokenManager;

//    @Override
//    public boolean login(String email, String password) throws CouponSystemException {
//        if (!companyRepository.existsByEmailAndPassword(email, password)) {
//            throw new CouponSystemException(ErrorMsg.LOGIN_NOT_FOUND);
//        }
//        companyId = companyRepository.getIdByEmailAndPassword(email, password);
//        return true;
//    } // PHASE 2!!!!!!!!!!!!!!!!!!
    @Override
    public UUID login(String email, String password) throws CouponSecurityException, CouponSystemException {
        if (!companyRepository.existsByEmailAndPassword(email, password)) {
            throw new CouponSecurityException(SecurityErrorMsg.LOGIN_NOT_FOUND);
        }
        companyId =  companyRepository.getIdByEmailAndPassword(email, password);
        UUID token = tokenManager.saveToken(email, companyId,ClientType.COMPANY);
        return token;
    }

    @Override
    public void addCoupon( int companyId,Coupon coupon) throws CouponSystemException {

        if (this.couponRepository.existsByTitleAndId(coupon.getTitle(), coupon.getId())) {
            throw new CouponSystemException(ErrorMsg.COUPON_TITLE_EXISTS);
        }
        couponRepository.saveAndFlush(coupon);
    }

    @Override
    public void updateCoupon(int companyId, int couponId, Coupon coupon) throws CouponSystemException {
        if (!couponRepository.existsById(couponId)) {
            throw new CouponSystemException(ErrorMsg.ID_NOT_FOUND);
        }
        Coupon couponById = getCoupon(companyId, couponId).get();
        couponById.setCategory(coupon.getCategory());
        couponById.setAmount(coupon.getAmount());
        couponById.setDescription(coupon.getDescription());
        couponById.setEndDate(coupon.getEndDate());
        couponById.setStartDate(coupon.getStartDate());
        couponById.setImage(coupon.getImage());
        couponById.setPrice(coupon.getPrice());
        couponById.setTitle(coupon.getTitle());
        couponRepository.saveAndFlush(couponById);
    }

    @Override
    public void deleteCoupon(int companyId, int couponId) throws CouponSystemException {
        if (!couponRepository.existsById(couponId)) {
            throw new CouponSystemException(ErrorMsg.ID_NOT_FOUND);
        }
        couponRepository.deleteById(couponId);

    }

    @Override
    public List<Coupon> getAllCoupons(int companyId) {
        return couponRepository.findCouponsByCompanyId(companyId);

    }

    @Override
    public List<Coupon> getAllCouponsByCategory(int companyId, Category category) throws CouponSystemException {
        if (!companyRepository.existsById(companyId)) {
            throw new CouponSystemException(ErrorMsg.ID_NOT_FOUND);
        }
        if (!couponRepository.existsByCategory(category)) {
            throw new CouponSystemException(ErrorMsg.CATEGORY_NOT_EXIST);
        }
        return couponRepository.findAllByCompanyIdAndCategory(companyId, category);
    }

    @Override
    public List<Coupon> getAllCouponsByMaxPrice(int companyId, double maxPrice) {
//        List<Coupon> couponList = new ArrayList<>();
//        for (Coupon coupon : couponRepository.findCouponsByCompanyId(companyId)) {
//            if (maxPrice >= coupon.getPrice()) {
//                couponList.add(coupon);
//            }
//        }
//        return couponList;
return  couponRepository.findCompanyCouponsByMaxPrice(companyId,maxPrice);
    }

    @Override
    public Optional<Company> getCompanyInfo(int companyId) {
        return companyRepository.findById(companyId);
    }

    @Override
    public Optional<Coupon> getCoupon(int companyId, int couponId) throws CouponSystemException {
        if (!couponRepository.existsById(couponId)) {
            throw new CouponSystemException(ErrorMsg.ID_NOT_FOUND);
        }
        return couponRepository.findById(couponId);
    }

}
