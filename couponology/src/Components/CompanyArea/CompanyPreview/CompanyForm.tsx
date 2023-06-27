import { useContext, useState } from "react";
import { CompanyModel } from "../../../Models/Company";
import { AlertForConnection } from "../CompanyList/CompanyList";
import NotyfContext from "../../../Services/NotyfContext";
import AdminService from "../../../Services/AdminService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container, TextField, ThemeProvider, createTheme } from '@mui/material';
import { Button } from '@mui/material';

interface CompanyFormProps {
    company?: CompanyModel;
    isUpdate: boolean;
    updateListData?: () => void,
}


const schema = yup.object({
    name: yup.string().required(" חייב לעדכן שם"),
    password: yup.string().required("חייב לעדכן סיסמא"),
    email: yup.string().required("חייב לעדכן אימייל").email("אימייל אינו חוקי")
})
type FormData = yup.InferType<typeof schema>;
const theme = createTheme({

})


export function CompanyForm(props: CompanyFormProps) {
    var adminService = new AdminService();
    const notyf = useContext(NotyfContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: props.company?.name,
            password: props.company?.password,
            email: props.company?.email,
        }
    })


    async function update(currentFormData: FormData) {
        const { email, password, name } = currentFormData
        const data = { id: props.company?.id, email: email.trim(), password: password.trim(), name: name.trim() };
        try {
            var res = await adminService.updateCompany(data);
            if (res.status === 204) {
                notyf.success("Company updated successfully");
                props.updateListData!();
            }
            if (res.status === 201) {
                notyf.error("Company does not exist in the system");
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

    async function create(currentFormData: FormData) {
        const { email, password, name } = currentFormData
        const data = { id: 0, email: email.trim(), password: password.trim(), name: name.trim() };
        try {
            var res = await adminService.addCompany(data);
            if (res.status === 201) {
                notyf.success("Company created successfully");
                props.updateListData!();
            }
            if (res.status === 204) {
                notyf.error("Company does not exist in the system");
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
            <TextField disabled={props.isUpdate} id="name" label="Name" variant="standard" {...register("name")} />
            {/* <input type="text" {...register("name")} /> */}
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <br />
            {/* <input type="text" {...register("password")} /> */}
            <TextField id="password" label="Password" variant="standard" {...register("password")} />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <br />
            <Button type="submit" variant="contained"> {props.isUpdate ? "Update" : "Create"} </Button>
        </form>
    </ThemeProvider>;
}