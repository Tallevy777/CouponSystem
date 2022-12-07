package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    void addCompany(Company company) throws CouponSystemException;

    void updateCompany(int companyId, Company company) throws CouponSystemException;

    void deleteCompany(int companyId) throws CouponSystemException;

    List<Company> getAllCompanies();

    Optional<Company> getCompany(int companyId) throws CouponSystemException;

    void addCustomer(Customer customer) throws CouponSystemException;

    void updateCustomer(int customerId, Customer customer) throws CouponSystemException;

    void deleteCustomer(int customerId) throws CouponSystemException;

    List<Customer> getAllCustomer();

    Optional<Customer> getCustomer(int customerId) throws CouponSystemException;



}
