import { useContext, useState } from "react";
import { CustomerModel } from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import NotyfContext from "../../../Services/NotyfContext";
import { AlertForConnection } from "../CustomerList/CustomerList";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { Button } from '@mui/material';


interface CustomerFormProps {
    customer?: CustomerModel;
    isUpdate: boolean;
    updateListData?: () => void,
}
const schema = yup.object({
    firstName: yup.string().required("שם משפחה אינו יכול להיות ריק"),
    lastName: yup.string().required("שם משפחה אינו יכול להיות ריק"),
    password: yup.string().required("סיסמא אינה יכולה להיות ריקה"),
    email: yup.string().required("אימייל אינו יכול להיות ריק").email("אימייל אינו חוקי")
})
type FormData = yup.InferType<typeof schema>;
const theme = createTheme({

})


export function CustomerForm(props: CustomerFormProps) {
    var adminService = new AdminService();
    const notyf = useContext(NotyfContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: props.customer?.firstName,
            lastName: props.customer?.lastName,
            password: props.customer?.password,
            email: props.customer?.email,
        }
    })

    async function update(currentFormData: FormData) {
        const { email, password, firstName, lastName } = currentFormData
        const data = { id: props.customer?.id, email: email.trim(), password: password.trim(), firstName: firstName.trim(), lastName: lastName.trim() };
        try {
            var res = await adminService.updateCustomer(data);
            if (res.status === 204) {
                notyf.success("Customer updated successfully");
                props.updateListData!();
            }
            if (res.status === 201) {
                notyf.error("Customer does not exist in the system");
            }
        } catch (err: any) {
            AlertForConnection(err, notyf);
            if (err.response?.status === 404) {
                notyf.error("Customer was not found");
            } else {
                notyf.error(err.response.data.value);
            }



        }
    }

    async function create(currentFormData: FormData) {
        try {
            const { email, password, firstName, lastName } = currentFormData
            const data = { id: props.customer?.id, email: email.trim(), password: password.trim(), firstName: firstName.trim(), lastName: lastName.trim() };
            var res = await adminService.addCustomer(data);
            if (res.status === 201) {
                notyf.success("Customer created successfully");
                props.updateListData!();
            }
        } catch (err: any) {
            AlertForConnection(err, notyf);
            if (err.response?.status === 404) {
                notyf.error("Company was not found");
            } else {
                notyf.error(err.response.data.value);
            }



        }
    }
    return <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(props.isUpdate ? update : create)}>
            <h1>
                {props.isUpdate ? "Update" : "Create"}
            </h1>
            <br />
            <TextField id="Email" label="Email" variant="standard" {...register("email")} />
            {/* <input type="text" {...register("email")} /> */}
            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <br />
            <TextField id="firstName" label="First Name" variant="standard" {...register("firstName")} />
            {/* <input type="text" {...register("firstName")} /> */}
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>
            <br />
            <TextField id="lastName" label="Last Name" variant="standard" {...register("lastName")} />
            {/* <input type="text" {...register("lastName")} /> */}
            <p style={{ color: "red" }}>{errors.lastName?.message}</p>
            <br />
            <TextField id="password" label="Password" variant="standard" {...register("password")} />
            {/* <input type="text" {...register("password")} /> */}
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <br />
            <Button type="submit" variant="contained"> {props.isUpdate ? "Update" : "Create"} </Button>
        </form>
    </ThemeProvider>;
}
