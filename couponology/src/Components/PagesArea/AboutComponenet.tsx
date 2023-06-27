import axios, { AxiosError } from "axios";
import { Notyf } from "notyf";
import { useCallback, useContext, useEffect, useState } from "react";
import { CompanyModel } from "../../Models/Company";
import { CustomerModel } from "../../Models/Customer";
import globals from "../../Services/globals";
import { useMyStore } from "../../Zustand/Store";
import { CompanyAbout } from "./SpecificAbout/CompanyAbout";
import { CustomerAbout } from "./SpecificAbout/CustomerAbout";
import CustomerService from "../../Services/CustomerService";
import CompanyService from "../../Services/CompanyService";


export function AlertForConnection(err: AxiosError, notyf: Notyf) {
    if (err.response?.status === 401) {
        notyf.error("Not connected, Please reconnect!")
    }
}
var companyService = new CompanyService();
var customerService = new CustomerService();
 export function AboutComponent(){
    const [info, setInfo] = useState<CompanyModel | CustomerModel >();

    const store = useMyStore()
    const getUrlsByConnectedClientType = useCallback(() => {
        switch (store.connectedClientType) {
            case "COMPANY":
                return companyService.getInfo()
            case "CUSTOMER":
                return customerService.getInfo()
            default:
                throw new Error("");
                break;
        }
    }, [store.connectedClientType])


    useEffect(() => {
        var func = async () =>{
            try{
           var res = await  getUrlsByConnectedClientType()
                setInfo(res);
            }
            catch (err : any) {
                 AlertForConnection(err, new Notyf());
            };
        }
        func()
}, [getUrlsByConnectedClientType]);

const specificAbout = store.connectedClientType === "CUSTOMER" ? 
<CustomerAbout customer = {info as CustomerModel} /> :
<CompanyAbout company = {info as CompanyModel}/>

return (
    <div className="AboutComponent">
      <>  
        <br />
        <h1> info</h1>
        <div>ID: {info?.id} </div>
        {info !== undefined && specificAbout}
        <div>Email: {info?.email} </div>
        <div>Password: {info?.password} </div>
        </>
    </div>
);
}

