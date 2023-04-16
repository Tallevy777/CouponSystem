package jb.com.CouponSystemPhase2.clr;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.dto.LoginReqDto;
import jb.com.CouponSystemPhase2.dto.LoginResDto;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.repos.CouponRepository;
import jb.com.CouponSystemPhase2.security.TokenManager;
import jb.com.CouponSystemPhase2.services.CustomerService;
import jb.com.CouponSystemPhase2.services.CustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerServiceImpl customerServiceImpl;
    private final CustomerService customerService;
    private final CouponRepository couponRepository;
    private final TokenManager tokenManager;

    @PostMapping("login")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResDto login(@Valid @RequestBody LoginReqDto loginReqDto) throws CouponSystemException, CouponSecurityException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        UUID token = customerServiceImpl.login(email, password);
        return new LoginResDto(token);
    }


    @GetMapping("purchase")
    public void purchaseCoupon(@RequestHeader ("Authorization") UUID token, @RequestParam  int couponId) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        customerService.purchaseCoupon(couponRepository.getById(couponId), userId);

    }

    @GetMapping("coupons")
    public List<Coupon> getAllCustomerCoupons(@RequestHeader ("Authorization") UUID token) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return customerService.getAllCustomerCoupons( userId);
    }

    @GetMapping("allCoupons")
    public List<Coupon> getAllCoupons(@RequestHeader("Authorization")UUID token) throws CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return customerService.getAllCoupons(userId);
    }

    @GetMapping("getCouponsByCategory/{category}")
    public List<Coupon> getAllCouponsByCategory(@RequestHeader ("Authorization") UUID token,@RequestParam Category category) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return customerService.getAllCouponsByCategory(userId, category);
    }

    @GetMapping("getCouponsByMaxPrice/{maxPrice}")
    public List<Coupon> getAllCouponsByMaxPrice(@RequestHeader ("Authorization") UUID token,@RequestParam double maxPrice) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return customerService.getAllCouponsByMaxPrice(userId, maxPrice);
    }

    @GetMapping("customer")
    public Optional<Customer> getCustomerInfo(@RequestHeader ("Authorization") UUID token) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return customerService.getCustomerInfo(userId);
    }
}
