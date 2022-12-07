package jb.com.CouponSystemPhase2.jobs;

import jb.com.CouponSystemPhase2.repos.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ExpiredCouponRemoval {

    @Autowired
    private CouponRepository couponRepository;

    @Scheduled(fixedRate = 86400000)
    public void run() {
        couponRepository.expiredCouponsRemoval();
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Removed Expired Coupons!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }
}
