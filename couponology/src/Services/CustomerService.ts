import axios from "axios";
import { CouponModel } from "../Models/Coupon";
import { CustomerModel } from "../Models/Customer";
import { LoginReq } from "../Components/AuthArea/Login/Login";

class CustomerService {
    public async getAllCoupons() {
        return (await axios.get<CouponModel[]>('http://localhost:8080/api/customer/allCoupons')).data;
    }
    public async getAllCustomerCoupons() {
        return (await axios.get<CouponModel[]>('http://localhost:8080/api/customer/coupons')).data;
    }
    public async getAllCouponsByCategory(selectedCategory: string) {
        return (await axios.get<CouponModel[]>('http://localhost:8080/api/customer/couponsByCategory?category=' + selectedCategory)).data;
    }
    public async getAllCouponsByMaxPrice(maxPrice: number) {
        return (await axios.get<CouponModel[]>('http://localhost:8080/api/customer/couponsByMaxPrice?maxPrice=' + maxPrice)).data;
    }
    public async getInfo() {
        return (await axios.get<CustomerModel>('http://localhost:8080/api/customer/customer')).data;
    }
    public async purchaseCoupon(id: number | undefined) {
        return (await axios.get('http://localhost:8080/api/customer/purchase?couponId=' + id)).data;
    }
    public async login(data: LoginReq) {
        return (await axios.post<{ token: string }>('http://localhost:8080/api/customer/login', data));
    }
}

export default CustomerService