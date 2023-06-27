class Globals {
}

type Urls ={
    company: {
        coupon:CouponUrls
    },
    customer: {
        coupon:CouponUrls,
        allCoupons:string
    }
    coupons: string,
    companyCouponsByCategory: string
    companyCouponsByMaxPrice: string
    getCouponById: string
    deleteById: string
    images:string
    companyLogin:string
    getCompanyInfo:string
    getCustomerInfo: string
    customerLogin:string
    adminLogin: string
    purchaseCoupon:string;
    updateCoupon: string;
    createCoupon:string
}

type CouponUrls = {
    couponsByCategory: string
    couponsByMaxPrice: string
    coupons: string,
}


class DevelopmentGlobals extends Globals {
    public urls:Urls = {
        company:{
            coupon:{
                couponsByCategory: "http://localhost:8080/api/company/getAllCouponsByCategory/category",
                couponsByMaxPrice: "http://localhost:8080/api/company/getAllCouponsByMaxPrice/maxprice",
                coupons: "http://localhost:8080/api/company/getAllCoupons/",
            }
        },
        customer:{
            coupon:{
                couponsByCategory: "http://localhost:8080/api/customer/couponsByCategory/category",
                couponsByMaxPrice: "http://localhost:8080/api/customer/couponsByMaxPrice/maxprice",
                coupons: "http://localhost:8080/api/customer/coupons/",
            },
            allCoupons:"http://localhost:8080/api/customer/allCoupons",
        },
        coupons: "http://localhost:8080/api/company/allCoupons/",
        companyCouponsByCategory: "http://localhost:8080/api/company/allCouponsByCategory/category",
        companyCouponsByMaxPrice: "http://localhost:8080/api/company/allCouponsByMaxPrice/maxprice",
        getCouponById: "http://localhost:8080/api/company/coupon/",
        deleteById: "http://localhost:8080/api/company/coupon/",
        images: "http://localhost:8080/api/coupon/images/",
        companyLogin: "http://localhost:8080/api/company/login/",
        getCustomerInfo: "http://localhost:8080/api/customer/customer",
        getCompanyInfo: "http://localhost:8080/api/company/companyInfo/",
        customerLogin: "http://localhost:8080/api/customer/login/",
        adminLogin: "http://localhost:8080/api/admin/login/",
        purchaseCoupon: "http://localhost:8080/api/customer/purchase",
        updateCoupon: "http://localhost:8080/api/company/coupon/",
        createCoupon: "http://localhost:8080/api/company/coupons",
        
    }
}

class ProductionGlobals extends Globals {
    public urls:Urls = {
        company:{
            coupon:{
                couponsByCategory: "http://localhost:8080/api/company/allCouponsByCategory/category",
                couponsByMaxPrice: "http://localhost:8080/api/company/allCouponsByMaxPrice/maxprice",
                coupons: "http://localhost:8080/api/company/allCoupons/",
            }
        },
        customer:{
            coupon:{
                couponsByCategory: "http://localhost:8080/api/customer/couponsByCategory/category",
                couponsByMaxPrice: "http://localhost:8080/api/customer/couponsByMaxPrice/maxprice",
                coupons: "http://localhost:8080/api/customer/coupons/",
            },
            allCoupons:"http://localhost:8080/api/customer/AllCoupons",
        },
        coupons: "http://localhost:8008/api/company/allCoupons/",
        companyCouponsByCategory: "http://localhost:8080/api/company/allCouponsByCategory/category",
        companyCouponsByMaxPrice: "http://localhost:8080/api/company/allCouponsByMaxPrice/maxprice",
        getCouponById: "http://localhost:8080/api/company/coupon/",
        deleteById: "http://localhost:8080/api/company/coupon/",
        images: "http://localhost:8080/api/coupon/images/",
        companyLogin: "http://localhost:8080/api/company/login/",
        getCustomerInfo: "http://localhost:8080/api/customer/customer",
        getCompanyInfo: "http://localhost:8080/api/company/companyInfo/",
        customerLogin: "http://localhost:8080/api/customer/login/",
        adminLogin: "http://localhost:8080/api/admin/login/",
        purchaseCoupon: "http://localhost:8080/api/customer/purchase",
        updateCoupon: "http://localhost:8080/api/company/coupon/",
        createCoupon: "http://localhost:8080/api/company/coupons",
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;