package jb.com.CouponSystemPhase2.services;

import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.repos.CompanyRepository;
import jb.com.CouponSystemPhase2.repos.CouponRepository;
import jb.com.CouponSystemPhase2.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service

public abstract class ClientService {

    @Autowired
    protected  CouponRepository couponRepository;
    @Autowired
    protected  CustomerRepository customerRepository;
    @Autowired
    protected  CompanyRepository companyRepository;

    public abstract UUID login(String email, String password) throws CouponSecurityException, CouponSystemException;

}
