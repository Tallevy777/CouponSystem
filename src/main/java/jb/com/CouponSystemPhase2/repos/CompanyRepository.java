package jb.com.CouponSystemPhase2.repos;


import jb.com.CouponSystemPhase2.beans.Company;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;


@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    boolean existsByEmail(String email);

    boolean existsByName(String name);

    boolean existsById(int companyId);

    boolean existsByEmailAndPassword(String email, String password);

    @Query(value = "SELECT * FROM (SELECT id FROM `couponsystemphase2`.companies WHERE email = :email and password = :password) as res", nativeQuery = true)
    int getIdByEmailAndPassword(String email, String password);
}
