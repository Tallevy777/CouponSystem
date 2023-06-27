import axios, { AxiosError } from "axios"
import { Notyf } from "notyf"
import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Popup from "reactjs-popup"
import { CouponModel } from "../../../Models/Coupon"
import globals from "../../../Services/globals"
import NotyfContext from "../../../Services/NotyfContext"
import { useMyStore } from "../../../Zustand/Store"
import { AlertForConnection } from "../CouponList/CouponList"
import { CouponForm } from "../CouponPreview/CouponForm"
import CustomerService from "../../../Services/CustomerService"
import CompanyService from "../../../Services/CompanyService"

var notyf = new Notyf();
type CouponItemProps = {
    isShowAmount: boolean

}
var companyService = new CompanyService();
var customerService = new CustomerService();


export const CouponItem = (props: CouponItemProps) => {
    let { couponId } = useParams();
    const notyf = useContext(NotyfContext)
    const store = useMyStore()
    const nav = useNavigate();
    const [coupon, setCoupon] = useState<CouponModel>({})


    useEffect(() => {
        const func = async () => {
            try {
                // let res = await axios.get<CouponModel>(globals.urls.getCouponById+"/"+couponId)
                let res = await companyService.getCoupon(Number(couponId))
                setCoupon(res)
            } catch (err: any) {
                AlertForConnection(err, notyf)
            }
        }
        func()

    }, [notyf, couponId])
    async function deleteCoupon(id: number) {
        try {
            await companyService.deleteCoupon(id)
            notyf.success("Coupon deleted successfully")
            nav("/company/coupons")
        }
        catch (err: any) {
            AlertForConnection(err, notyf)
        }
    }
    async function purchaseCoupon(id: number) {
        try {
            // let res = await axios.get(globals.urls.purchaseCoupon + "?couponId=" + id)
            let res = await customerService.purchaseCoupon(id)
            notyf.success("Purchase Was Successful")
        } catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response.data.value === "Sorry this coupon just expired!") {
                notyf.error("this coupon just expired!")
            } else {
                notyf.error(err.response.data.value);
            }
        }
    }

    return <div>
        <h1>Title: {coupon?.title} </h1>
        {props.isShowAmount && <div>Amount: {coupon?.amount} </div>}
        <div>Description: {coupon?.description} </div>
        <div>Category: {coupon?.category}</div>
        <h2>Price: {coupon?.price}</h2>
        <> EndDate: {coupon?.endDate}</>
        <br />
        <img className="image" src={coupon?.image} alt="Coupon" />
        <br />

        {store.connectedClientType === "CUSTOMER" && <button onClick={() => purchaseCoupon(coupon.id!)}>Purchase </button>}
        <br />
        {store.connectedClientType === "COMPANY" && <Popup trigger={<button> Update</button>} position="right center">
            <CouponForm coupon={coupon} isUpdate={true} />
        </Popup>}
        <br />
        {store.connectedClientType === "COMPANY" && <button onClick={() => deleteCoupon(coupon.id!)}>Delete </button>}
        <br />
    </div>
}


