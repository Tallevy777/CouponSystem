import axios from "axios";
import { CouponModel } from "../Models/Coupon";
import { CompanyModel } from "../Models/Company";
import { LoginReq } from "../Components/AuthArea/Login/Login";


class CompanyService {
  public async getAllCoupons() {
    return (await axios.get<CouponModel[]>('http://localhost:8080/api/company/allCoupons')).data;
  }
  public async getAllCouponsByCategory(selectedCategory: string) {
    return (await axios.get<CouponModel[]>('http://localhost:8080/api/company/allCouponsByCategory?category=' + selectedCategory)).data;
  }
  public async getAllCouponsByMaxPrice(maxPrice: number) {
    return (await axios.get<CouponModel[]>('http://localhost:8080/api/company/allCouponsByMaxPrice?maxPrice=' + maxPrice)).data;
  }
  public async getInfo() {
    return (await axios.get<CompanyModel>('http://localhost:8080/api/company/companyInfo')).data;
  }
  public async getCoupon(id: number) {
    return (await axios.get<CouponModel>('http://localhost:8080/api/company/coupon/' + id)).data;
  }
  public async updateCoupon(coupon: CouponModel) {
    return await axios.put('http://localhost:8080/api/company/coupon/' + coupon.id, coupon)
  }
  public async deleteCoupon(id: number) {
    return (await axios.delete('http://localhost:8080/api/company/coupon/' + id)).data;
  }
  public async addCoupon(coupon: CouponModel) {
    return await axios.post('http://localhost:8080/api/company/coupons', coupon);
  }
  public async login(data: LoginReq) {
    return (await axios.post<{ token: string }>('http://localhost:8080/api/company/login', data));
  }
}



export default CompanyService;