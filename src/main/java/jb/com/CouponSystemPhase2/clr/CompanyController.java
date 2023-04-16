package jb.com.CouponSystemPhase2.clr;


import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.dto.LoginReqDto;
import jb.com.CouponSystemPhase2.dto.LoginResDto;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.security.TokenManager;
import jb.com.CouponSystemPhase2.services.CompanyService;
import jb.com.CouponSystemPhase2.services.CompanyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/company")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompanyController {
    private final CompanyService companyService;
    private final CompanyServiceImpl companyServiceImpl;
    private final TokenManager tokenManager;

    @PostMapping("login")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResDto login(@Valid @RequestBody LoginReqDto loginReqDto) throws CouponSystemException, CouponSecurityException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        UUID token = companyServiceImpl.login(email, password);
        return new LoginResDto(token);
    }

    @PostMapping("coupons")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCoupon(@RequestHeader("Authorization") UUID token, @RequestBody Coupon coupon) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        companyService.addCoupon(userId, coupon);
    }

    @PutMapping("UpdateCoupon/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCoupon(@RequestHeader("Authorization") UUID token, @PathVariable int id, @RequestBody Coupon coupon) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        companyService.updateCoupon(userId, id, coupon);
    }

    @DeleteMapping("deleteCoupons/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@RequestHeader("Authorization") UUID token, @PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        companyService.deleteCoupon(userId, id);
    }

    @GetMapping("getAllCouponsByCategory/{category}")
    public List<Coupon> getAllCouponsByCategory(@RequestHeader("Authorization") UUID token, @RequestParam Category category) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return companyService.getAllCouponsByCategory(userId, category);
    }

    @GetMapping("getAllCouponsByMaxPrice/{maxPrice}")
    public List<Coupon> getAllCouponsByMaxPrice(@RequestHeader("Authorization") UUID token, @RequestParam double maxPrice) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return companyService.getAllCouponsByMaxPrice(userId, maxPrice);
    }

    @GetMapping("getCompanyInfo")
    public Optional<Company> getCompanyInfo(@RequestHeader("Authorization") UUID token) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return companyService.getCompanyInfo(userId);
    }

    @GetMapping("getCoupon/{id}")
    public Optional<Coupon> getCoupon(@RequestHeader("Authorization") UUID token, @PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return companyService.getCoupon(userId, id);
    }

    @GetMapping("getAllCoupons")
    public List<Coupon> getAllCoupons(@RequestHeader("Authorization") UUID token) throws CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return companyService.getAllCoupons(userId);
    }

//    @GetMapping ("coupon")
//    public List<Coupon> getAllCoupons(@RequestHeader("Authorization") UUID token) {
//        int userid = tokenManager.getUserId()
//        return companyService.getAllCoupons();
//    }
}
