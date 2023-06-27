import { Notyf } from "notyf";
import { CustomerModel } from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { CustomerForm } from "./CustomerForm";


export var notyf = new Notyf();
var adminService = new AdminService();
interface CustomerPreviewProps {
    customer: CustomerModel;
    deleteCustomer: (id: number) => void
    getList: () => void;
}
export function CustomerPreview(props: CustomerPreviewProps): JSX.Element {
    return (
        <div className="CustomerPreview">
            <h2>{props.customer.firstName}</h2>
            <h2> {props.customer.lastName} </h2>
            <div className="card">
                <img className="image" src="https://media.licdn.com/dms/image/C5612AQEXTt4grfiTxQ/article-cover_image-shrink_720_1280/0/1520181045312?e=2147483647&v=beta&t=Z6g_nFW524kw9hTrqMfS9CshPF4-VV4OffMyJmROOCI" alt="Customer" />
                <h1>{props.customer.id}</h1>
                <p> {props.customer.email}</p>
                <p> {props.customer.password}</p>
                <p> <button onClick={() => props.deleteCustomer(props.customer.id!)}>Delete</button></p>
                <Popup trigger={<button> Update</button>} position="center center">
                    <CustomerForm customer={props.customer} isUpdate={true} updateListData={props.getList} />
                </Popup>
            </div>
        </div>
    );

}