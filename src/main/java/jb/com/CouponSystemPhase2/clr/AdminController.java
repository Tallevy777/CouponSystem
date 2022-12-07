package jb.com.CouponSystemPhase2.clr;


import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.dto.LoginReqDto;
import jb.com.CouponSystemPhase2.dto.LoginResDto;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.security.TokenManager;
import jb.com.CouponSystemPhase2.services.AdminService;
import jb.com.CouponSystemPhase2.services.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServiceImpl adminServiceImpl;
    private final AdminService adminService;
    private final TokenManager tokenManager;

    @PostMapping ("login")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResDto login(@Valid @RequestBody LoginReqDto loginReqDto) throws CouponSystemException, CouponSecurityException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        UUID token = adminServiceImpl.login(email, password);
        return new LoginResDto(token);

    }

    @PostMapping ("/{company}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCompany(@RequestHeader ("Authorization") UUID token, @RequestBody Company company) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.addCompany(company);
    }

    @PutMapping("updateCompany/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCompany(@RequestHeader ("Authorization") UUID token,@PathVariable int id, @RequestBody Company company) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.updateCompany(id, company);
    }

    @DeleteMapping("deleteCompany/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@RequestHeader ("Authorization") UUID token,@PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.deleteCompany(id);
    }
    @GetMapping ("companies")
    public List<Company> getAllCompanies(@RequestHeader ("Authorization") UUID token) throws CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return adminService.getAllCompanies();
    }
    @GetMapping ("companies/{id}")
    public Optional<Company> getCompany(@RequestHeader ("Authorization") UUID token,@PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return adminService.getCompany(id);
    }
    @PostMapping("/{customer}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCustomer(@RequestHeader ("Authorization") UUID token,@RequestBody Customer customer) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.addCustomer(customer);
    }

    @PutMapping("customers/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCustomer(@RequestHeader ("Authorization") UUID token,@PathVariable int id, @RequestBody Customer customer) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.updateCustomer(id, customer);
    }
    @DeleteMapping("customers/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@RequestHeader ("Authorization") UUID token,@PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        adminService.deleteCustomer(id);
    }
    @GetMapping ("customers")
    public List<Customer> getAllCustomer(@RequestHeader ("Authorization") UUID token) throws CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return adminService.getAllCustomer();
    }
    @GetMapping ("customers/{id}")
    public Optional<Customer> getCustomer(@RequestHeader ("Authorization") UUID token,@PathVariable int id) throws CouponSystemException, CouponSecurityException {
        int userId = tokenManager.getUserId(token);
        return adminService.getCustomer(id);
    }

}
