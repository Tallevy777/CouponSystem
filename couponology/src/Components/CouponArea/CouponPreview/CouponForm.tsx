import axios from "axios";
import globals from "../../../Services/globals";
import { AlertForConnection } from "../CouponList/CouponList";
import { useContext, useState } from "react";
import { Category } from "../../../Models/Category";
import DatePicker from "react-datepicker";
import { CompanyModel } from "../../../Models/Company";
import { notyf } from "./CouponPreview";
import { CouponModel } from "../../../Models/Coupon";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CompanyService from "../../../Services/CompanyService";
import NotyfContext from "../../../Services/NotyfContext";
import { useForm } from "react-hook-form";
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { Button } from '@mui/material';

export type CouponFormProps = {
    coupon?: CouponModel,
    isUpdate: boolean,
    updateListData?: () => void,
}

const schema = yup.object({
    amount: yup.number().required(" חייב לעדכן כמות"),
    category: yup.string<Category>().required("סוג משתמש לא תקין"),
    description: yup.string().required(" חייב לעדכן תיאור"),
    endDate: yup.date().required("חייב לעדכן תאריך פקיעה"),
    image: yup.string().required(" חייב לעדכן תמונה"),
    price: yup.number().required("חייב לעדכן מחיר"),
    title: yup.string().required("חייב לעדכן כותרת")

})
type FormData = yup.InferType<typeof schema>;
const theme = createTheme({

})

export function CouponForm(props: CouponFormProps) {
    var companyService = new CompanyService();
    const notyf = useContext(NotyfContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            category: props.coupon?.category,
            description: props.coupon?.description,
            image: props.coupon?.image,
            price: props.coupon?.price,
            title: props.coupon?.title,
            endDate: new Date(props.coupon?.endDate ?? new Date()),
            amount: props.coupon?.amount,
        }
    })
    // const [selectedCategory, setSelectedCategory] = useState(props.coupon?.category ?? Category.Food);
    // const [amount, setAmount] = useState(props.coupon?.amount ?? 0);
    // const [description, setDescription] = useState(props.coupon?.description ?? "");
    // const [price, setPrice] = useState(props.coupon?.price ?? 0);
    // const [title, setTitle] = useState(props.coupon?.title ?? "");
    // const [image, setImage] = useState(props.coupon?.image ?? "");
    // const [endDate, setEndDate] = useState<Date>(props.coupon === undefined ? new Date() : new Date(props.coupon?.endDate!));
    async function update(currentFormData: FormData) {
        try {
            var companyInfo = await companyService.getInfo();
            const { amount, category, description, endDate, image, price, title } = currentFormData
            const data: CouponModel = {
                id: props.coupon?.id,
                amount: amount,
                category: category,
                company: {
                    email: companyInfo.email,
                    id: companyInfo.id,
                    name: companyInfo.name,
                    password: companyInfo.password
                },
                description: description.trim(),
                endDate: endDate.toISOString(),
                image: image.trim(),
                price: price,
                startDate: props.coupon?.startDate,
                title: title.trim()
            };

            var res = await companyService.updateCoupon(data);
            if (res.status === 204) {
                notyf.success("Coupon updated successfully");
                if (props.updateListData !== undefined) {
                    props.updateListData();
                }
            }
            if (res.status === 201) {
                notyf.error("Coupon does not exist in the system");
            }
        } catch (err: any) {
            AlertForConnection(err, notyf);
            if (err.response?.status === 404) {
                notyf.error("Coupon was not found");
            } else {
                notyf.error(err.response.data.value);
            }



        }
    }

    async function create(currentFormData: FormData) {

        try {
            var companyInfo = await companyService.getInfo();
            const { amount, category, description, endDate, image, price, title } = currentFormData
            const data: CouponModel = {
                id: props.coupon?.id,
                amount: amount,
                category: category,
                company: {
                    email: companyInfo.email,
                    id: companyInfo.id,
                    name: companyInfo.name,
                    password: companyInfo.password
                },
                description: description.trim(),
                endDate: endDate.toISOString(),
                image: image.trim(),
                price: price,
                startDate: new Date().toISOString(),
                title: title.trim()
            };
            const res = await companyService.addCoupon(data);
            if (res.status === 201) {
                notyf.success("Coupon created successfully");
                if (props.updateListData !== undefined) {
                    props.updateListData();
                }
            }
            if (res.status === 204) {
                notyf.error("Coupon does not exist in the system");
            }
        } catch (err: any) {
            AlertForConnection(err, notyf);
            if (err.response?.status === 404) {
                notyf.error("Coupon was not found");
            } else {
                notyf.error(err.response.data.value);
            }
        }
    }
    return <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(props.isUpdate ? update : create, () => { console.log("invalid warning") })}><h1>
            {props.isUpdate ? "Update" : "Create"}
        </h1>
            <select {...register("category")}>
                <option value={Category.Food}>Food </option>
                <option value={Category.Drinks}>Drinks </option>
                <option value={Category.Vacation}>Vacation </option>
                <option value={Category.Sports}>Sport </option>
                <option value={Category.Pc}>Pc </option>
            </select>
            <br />
            <TextField id="amount" label="Amount" variant="standard" {...register("amount")} />
            {/* <input type="number" {...register("amount")} /> */}
            <p style={{ color: "red" }}>{errors.amount?.message}</p>
            <br />
            <TextField id="description" label="Description" variant="standard" {...register("description")} />
            {/* <input type="text" {...register("description")} /> */}
            <p style={{ color: "red" }}>{errors.description?.message}</p>
            <br />
            <TextField id="endDate" label="End Date" variant="standard" {...register("endDate")} />
            {/* <input type="date" {...register("endDate")} /> */}
            <p style={{ color: "red" }}>{errors.endDate?.message}</p>
            <br />
            <TextField id="image" label="Image" variant="standard" {...register("image")} />
            {/* <input type="text" {...register("image")} /> */}
            <p style={{ color: "red" }}>{errors.image?.message}</p>
            <br />
            <TextField id="price" label="Price" variant="standard" {...register("price")} />
            {/* <input type="number" {...register("price")} /> */}
            <p style={{ color: "red" }}>{errors.price?.message}</p>
            <br />
            <TextField id="title" label="Title" variant="standard" {...register("title")} />
            {/* <input type="text" {...register("title")} /> */}
            <p style={{ color: "red" }}>{errors.title?.message}</p>
            <br />
            <Button type="submit" variant="contained"> {props.isUpdate ? "Update" : "Create"} </Button>
        </form>
    </ThemeProvider>;
}
