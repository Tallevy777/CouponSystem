import axios, { AxiosError } from "axios";
import { Notyf } from "notyf";
import { useCallback, useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { CouponModel } from "../../../Models/Coupon";
import globals from "../../../Services/globals";
import NotyfContext from "../../../Services/NotyfContext";
import { useMyStore } from "../../../Zustand/Store";
import CouponPreview from "../CouponPreview/CouponPreview";
import { CouponForm } from "../CouponPreview/CouponForm";
import "./CouponList.css";
import CompanyService from "../../../Services/CompanyService";
import CustomerService from "../../../Services/CustomerService";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';




export function AlertForConnection(err: AxiosError, notyf: Notyf) {
    if (err.response?.status === 401) {
        notyf.error("Not connected, Please reconnect!")
    }
}

type CouponListProps = {
    isAllCoupons?: boolean,
    urlPrefix: string;
}

var companyService = new CompanyService();
var customerService = new CustomerService();

function CouponList(props: CouponListProps): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    const notyf = useContext(NotyfContext)
    const [maxPrice, setSelectedMaxPrice] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState("FOOD")
    const store = useMyStore()
    const getUrlsByConnectedClientType = useCallback(() => {
        switch (store.connectedClientType) {
            case "COMPANY":
                return companyService
                break;
            case "CUSTOMER":
                return customerService
            default:
                throw new Error("");
                break;
        }
    }, [store.connectedClientType])

    const getList = useCallback(
        async () => {
            let url = ""
            try {
                if (props.isAllCoupons !== undefined && props.isAllCoupons === true) {
                    var couponList = await getUrlsByConnectedClientType().getAllCoupons();
                    setCoupons(couponList);
                } else {
                    var couponList = await customerService.getAllCustomerCoupons();
                    setCoupons(couponList);
                }
            }
            catch (err: any) {
                AlertForConnection(err, notyf)
            }
        }, [getUrlsByConnectedClientType, notyf, props.isAllCoupons])



    const onFilterByCategory = async () => {

        try {
            let res = await getUrlsByConnectedClientType().getAllCouponsByCategory(selectedCategory)
            setCoupons(res);
        } catch (err: any) {
            if (err instanceof AxiosError) {    // TS for axios error
                AlertForConnection(err, notyf)
                if (err.response?.status === 400) {
                    setCoupons([])
                    notyf.error("No Coupons Found For this Category")
                }
            }
        }
    }
    const onFilterByMaxPrice = async () => {
        try {
            let res = await getUrlsByConnectedClientType().getAllCouponsByMaxPrice(maxPrice)
            setCoupons(res)
        } catch (err: any) {
            AlertForConnection(err, notyf)
        }
    }
    useEffect(() => {
        getList()
    }, [getList]);

    async function DeleteCoupon(id: number) {
        try {
            let res = await companyService.deleteCoupon(id)
            setCoupons(coupons.filter(coupon => coupon.id !== id));
            notyf.success("Coupon deleted successfully")
        }
        catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response?.status === 400) {
                notyf.error("Coupon was not found")
            }
        }
    }
    return (
        <Box height={"100%"} overflow={"auto"}>
            {!props.isAllCoupons &&
                <>  <input type="number" value={maxPrice} onChange={s => setSelectedMaxPrice(s.target.value === "" ? 0 : parseInt(s.target.value))} />
                    <br />
                    <Button variant="outlined" size="small" onClick={onFilterByMaxPrice} >Filter By Max Price </Button>
                    <br />
                    <br />
                    <FormControl size="medium">
                        <InputLabel id="selected-category">Category</InputLabel>
                        <Select
                            value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} label="Category">
                            <MenuItem value={"FOOD"}>Food</MenuItem>
                            <MenuItem value={"DRINKS"}>Drinks</MenuItem>
                            <MenuItem value={"VACATION"}>Vacation</MenuItem>
                            <MenuItem value={"SPORTS"}>Sport</MenuItem>
                            <MenuItem value={"PC"}>Pc</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <Button variant="outlined" size="small" onClick={onFilterByCategory} >Filter By Category </Button>
                    <br />
                    <br />
                    <Button variant="contained" size="medium" onClick={getList} >Reload Full List</Button>
                </>}
            <h2> Coupon List</h2>
            <br />
            {store.connectedClientType === "COMPANY" && <Popup trigger={<Button variant="contained"> Create New Coupon</Button>} position="center center">
                <CouponForm updateListData={getList} isUpdate={false} />
            </Popup>}

            {coupons?.map(c => <CouponPreview updateListData={getList} urlPrefix={props.urlPrefix} purchaseable={props.isAllCoupons} coupon={c} deleteCoupon={DeleteCoupon} key={c.id} />)}
        </Box>
    );
}

export default CouponList;