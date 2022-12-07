package jb.com.CouponSystemPhase2.repos;


import jb.com.CouponSystemPhase2.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query(value = "SELECT * FROM(SELECT id FROM `couponsystemphase2`.customers WHERE email = :email and password = :password) as res", nativeQuery = true)
    int getIdByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    Customer findCustomerById(int customerId);

    boolean existsById(int customerId); // REDUNDENT

    boolean existsByEmailAndPassword(String email, String password);




}
