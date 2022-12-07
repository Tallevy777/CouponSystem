package jb.com.CouponSystemPhase2.repos;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
//    boolean existsByTitle(String title);

    boolean existsByTitleAndId(String title, int id);
//    boolean existsByCompanyId(int companyId);
    boolean existsByCategory(Category category);

    List<Coupon> findAllByCompanyIdAndCategory(int companyId, Category category);
    List<Coupon> findCouponsByCompanyId(int companyId);
    @Query(value = "SELECT * FROM couponsystemphase2.coupons JOIN couponsystemphase2.customers_coupons ON id =coupons_id  WHERE customer_id = :customerId AND price <= :maxPrice", nativeQuery = true)
    List<Coupon> findCustomerCouponsByMaxPrice(@Param("customerId")int customerId, @Param("maxPrice")double maxPrice);

    //@Query(value = "SELECT * FROM couponsystemphase2.coupons LEFT JOIN couponsystemphase2.customers_coupons ON id =coupons_id  WHERE company_id = :companyId AND price <= :maxPrice", nativeQuery = true)
    @Query(value = "SELECT * FROM couponsystemphase2.coupons WHERE company_id = :companyId AND price <= :maxPrice", nativeQuery = true)
    List<Coupon> findCompanyCouponsByMaxPrice(@Param("companyId") int companyId, @Param("maxPrice") double maxPrice);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM couponsystemphase2.coupons where end_date<sysdate();", nativeQuery = true)
    void expiredCouponsRemoval();

    @Query(value = "SELECT * FROM couponsystemphase2.coupons JOIN couponsystemphase2.customers_coupons ON id = coupons_id  WHERE customer_id = :customerId", nativeQuery = true)
    List<Coupon> getCustomerCoupons(@Param("customerId")int customerId);

    @Query(value = "SELECT couponsystemphase2.coupons.* FROM couponsystemphase2.coupons JOIN couponsystemphase2.customers_coupons ON id = coupons_id WHERE customer_id = :customerId AND category = :category", nativeQuery = true)
    List<Coupon> getCustomerCouponsByCategory(@Param("customerId")int customerId, @Param("category")String category);


}
