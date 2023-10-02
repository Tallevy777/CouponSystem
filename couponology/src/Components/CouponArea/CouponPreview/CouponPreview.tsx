import axios, { AxiosError } from "axios";
import { Notyf } from "notyf";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { CouponModel } from "../../../Models/Coupon";
import globals from "../../../Services/globals";
import { useMyStore } from "../../../Zustand/Store";
import { AlertForConnection } from "../CouponList/CouponList";
import "./CouponPreview.css";
import 'reactjs-popup/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { CouponForm } from "./CouponForm";
import CustomerService from "../../../Services/CustomerService";


export var notyf = new Notyf();
var customerService = new CustomerService();
interface CouponPreviewProps {

    coupon: CouponModel;
    deleteCoupon: (id: number) => void
    purchaseable?: boolean,
    urlPrefix: string;
    updateListData?: () => void;

}

async function purchaseCoupon(coupon: CouponModel) {
    try {
        let res = await customerService.purchaseCoupon(coupon.id);
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
function CouponPreview(props: CouponPreviewProps): JSX.Element {
    const store = useMyStore();
    const nav = useNavigate();
    return (
        <div className="CouponItem">
            <br />
            <div className="card">
                <img className="image" src={props.coupon.image} alt="Coupon" />
                <h1>{props.coupon.title}</h1>
                <p className="price">{props.coupon.price}</p>
                <p> {props.coupon.description}</p>
                <p>
                    {store.connectedClientType === "CUSTOMER" && props.purchaseable && <button onClick={() => purchaseCoupon(props.coupon)}>Purchase</button>}
                </p>
                <p>
                    {store.connectedClientType === "COMPANY" && <button onClick={() => props.deleteCoupon(props.coupon.id!)}>Delete</button>}
                </p>
                <p>
                    <button onClick={() => nav(props.urlPrefix === "" ?
                        props.coupon.id?.toString()! :
                        "/" + props.urlPrefix + "/" + props.coupon.id?.toString())}>View Coupon</button>
                </p>
                {store.connectedClientType === "COMPANY" && <Popup trigger={<button> Update</button>} position="center center">
                    <CouponForm updateListData={props.updateListData} coupon={props.coupon} isUpdate={true} />
                </Popup>}
            </div>
        </div>
    );
}


export default CouponPreview;





