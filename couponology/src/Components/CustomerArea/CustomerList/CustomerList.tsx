import { AxiosError } from "axios";
import AdminService from "../../../Services/AdminService";
import { useCallback, useContext, useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/Customer";
import Notyf from "notyf/notyf";
import NotyfContext from "../../../Services/NotyfContext";
import { CustomerPreview } from "../CustomerPreview/CustomerPreview";
import { Box, Button } from '@mui/material';
import Popup from "reactjs-popup";
import { CompanyForm } from "../../CompanyArea/CompanyPreview/CompanyForm";
import { CustomerForm } from "../CustomerPreview/CustomerForm";





export function AlertForConnection(err: AxiosError, notyf: Notyf) {

    if (err.response?.status === 401) {
        notyf.error("Not connected, Please reconnect!")
    }
}
var adminService = new AdminService();
export function CustomerList() {
    const [customerId, setCustomerId] = useState(0)
    const [filteredCustomer, setFilteredCustomer] = useState<CustomerModel>();
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const notyf = useContext(NotyfContext)
    const getList = useCallback(
        async () => {
            let url = ""
            try {
                var customerList = await adminService.getAllCustomers();
                setCustomers(customerList);
            } catch (err: any) {
                AlertForConnection(err, notyf)
            }
        }, [notyf])

    const findCustomerById = async () => {
        try {
            let res = await adminService.getCustomer(customerId);
            setFilteredCustomer(res);
        } catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response?.status === 400) {
                notyf.error("Customer was not found")
                setFilteredCustomer(undefined);
            }
        }
    }

    useEffect(() => {
        getList()
    }, [getList]);

    async function DeleteCustomer(id: number) {
        try {
            let res = await adminService.deleteCustomer(id)
            setCustomers(customers.filter(customer => customer.id !== id));
            notyf.success("Customer deleted successfully")
        }
        catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response?.status === 400) {
                notyf.error("Customer was not found")
            }
        }
    }

    return (
        <Box height={"100%"} overflow={"auto"}>
            <input type="number" value={customerId} onChange={s => setCustomerId(s.target.value === "" ? 0 : parseInt(s.target.value))} />
            <Button variant="outlined" onClick={findCustomerById} >Find Customer By Id </Button>
            <br />
            {filteredCustomer !== undefined && <Button variant="outlined" onClick={() => setFilteredCustomer(undefined)}>Show All Customers</Button>}
            <br />
            <h1> Customer List</h1>
            <br />
            <Popup trigger={<Button variant="contained"> Create New Customer</Button>} position="center center">
                <CustomerForm updateListData={getList} isUpdate={false} />
            </Popup>
            <br />
            {filteredCustomer === undefined && customers?.map(c => <CustomerPreview customer={c} deleteCustomer={DeleteCustomer} key={c.id} getList={getList} />)}
            {filteredCustomer !== undefined && <CustomerPreview customer={filteredCustomer} deleteCustomer={DeleteCustomer} getList={getList} />}
        </Box>
    );
}
export default CustomerList;