package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.exceptions.ErrorMsg;
import jb.com.CouponSystemPhase2.exceptions.SecurityErrorMsg;
import jb.com.CouponSystemPhase2.repos.CompanyRepository;
import jb.com.CouponSystemPhase2.repos.CustomerRepository;
import jb.com.CouponSystemPhase2.security.ClientType;
import jb.com.CouponSystemPhase2.security.TokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl extends ClientService implements AdminService {
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final TokenManager tokenManager;
    private final String adminEmail = "admin@admin";
    private final String adminPassword = "admin";

    //
//    public UUID login(String email, String password) {
//        return email.equals("admin@admin") && password.equals("admin");
//    }
    public UUID login(String email, String password) throws CouponSecurityException, CouponSystemException {

        if (!email.equals(adminEmail) || !password.equals(adminPassword)) {
            throw new CouponSecurityException(SecurityErrorMsg.LOGIN_NOT_FOUND);

        }
        UUID token = tokenManager.saveToken(email, 1, ClientType.ADMINISTRATOR);
        return token;
    }


    @Override
    public void addCompany(Company company) throws CouponSystemException {
        if (this.companyRepository.existsByName(company.getName())) {
            throw new CouponSystemException(ErrorMsg.COMPANY_NAME_ALREADY_EXISTS);
        }
        if (this.companyRepository.existsByEmail(company.getEmail())) {
            throw new CouponSystemException(ErrorMsg.COMPANY_EMAIL_ALREADY_EXISTS);
        }
        companyRepository.saveAndFlush(company);
    }

    @Override
    public void updateCompany(int companyId, Company company) throws CouponSystemException {
        if (!companyRepository.existsById(companyId)) {
            throw new CouponSystemException(ErrorMsg.COMPANY_ID_DOES_NOT_EXIST);
        }
        Company companyById = getCompany(companyId).get();
        companyById.setEmail(company.getEmail());
        companyById.setPassword(company.getPassword());
        companyRepository.saveAndFlush(companyById);
    }

    @Override
    public void deleteCompany(int companyId) throws CouponSystemException {
        if (!companyRepository.existsById(companyId)) {
            throw new CouponSystemException(ErrorMsg.COMPANY_ID_DOES_NOT_EXIST);
        }
        companyRepository.deleteById(companyId);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Optional<Company> getCompany(int companyId) throws CouponSystemException {
        if (!companyRepository.existsById(companyId)) {
            throw new CouponSystemException(ErrorMsg.COMPANY_ID_DOES_NOT_EXIST);
        }
        return companyRepository.findById(companyId);
    }

    @Override
    public void addCustomer(Customer customer) throws CouponSystemException {
        if (this.customerRepository.existsByEmail(customer.getEmail())) {
            throw new CouponSystemException(ErrorMsg.CUSTOMER_EMAIL_ALREADY_EXIST);
        }
        customerRepository.saveAndFlush(customer);
    }

    @Override
    public void updateCustomer(int customerId, Customer customer) throws CouponSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new CouponSystemException(ErrorMsg.CUSTOMER_ID_NOT_EXIST);
        }
        Customer customerById = getCustomer(customerId).get();
        customerById.setFirstName(customer.getFirstName());
        customerById.setLastName(customer.getLastName());
        customerById.setEmail(customer.getEmail());
        customerById.setPassword(customer.getPassword());
        customerRepository.saveAndFlush(customerById);


    }

    @Override
    public void deleteCustomer(int customerId) throws CouponSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new CouponSystemException(ErrorMsg.CUSTOMER_ID_NOT_EXIST);
        }
        customerRepository.deleteById(customerId);
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomer(int customerId) throws CouponSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new CouponSystemException(ErrorMsg.CUSTOMER_ID_NOT_EXIST);
        }
        return customerRepository.findById(customerId);
    }
}


