import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import globals from "../../../Services/globals";
import { clientType, useMyStore } from "../../../Zustand/Store";
import CompanyService from "../../../Services/CompanyService";
import AdminService from "../../../Services/AdminService";
import CustomerService from "../../../Services/CustomerService";
import * as yup from "yup";
import NotyfContext from "../../../Services/NotyfContext";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type LoginProps = {
}
export type LoginReq = {
    email: string;
    password: string;
    clientType: clientType;
}
const companyService = new CompanyService();
const adminService = new AdminService();
const customerService = new CustomerService();

const schema = yup.object({
    userName: yup.string().required("שם משתמש אינו יכול להיות ריק"),
    password: yup.string().required("סיסמא אינה יכולה להיות ריקה"),
    clientType: yup.string<clientType>().required("סוג משתמש לא תקין")
})
type FormData = yup.InferType<typeof schema>;

export function Login(props: LoginProps): JSX.Element {
    const nav = useNavigate();
    const notyf = useContext(NotyfContext)
    const [passwordShown, setPasswordShown] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })


    const store = useMyStore();
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
    const OnLoginClick = async (currentFormData: FormData) => {
        const { clientType, password, userName } = currentFormData
        const data = { email: userName.trim(), password: password.trim(), clientType: clientType };
        var response: AxiosResponse<{ token: string }> | undefined;
        var message = "";
        try {
            switch (clientType) {
                case "COMPANY":
                    response = await companyService.login(data)
                    nav("/")
                    break;
                case "CUSTOMER":
                    response = await customerService.login(data)
                    nav("/")
                    break
                case "ADMINISTRATOR":
                    response = await adminService.login(data)
                    nav("/")
                    break
                default:
                    break;
            }
            console.log(response);
            if (response !== undefined) {
                axios.defaults.headers.common['Authorization'] = response.data.token;
                store.login(userName, message, clientType)
                if (response.status === 201) {
                    notyf.success("Logged in successfully");
                }
            }
        } catch (err: any) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    notyf.error("Email or Password incorrect");
                }
            };
        };
    }
    return <form style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }} onSubmit={handleSubmit(OnLoginClick)}>
        <h1>Login</h1>
        <Container maxWidth="sm">
            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <FormControl size="medium" fullWidth>
                        <TextField fullWidth id="userName" label="User Name" variant="outlined" {...register("userName")} />
                        {/* <input type="text" {...register("userName")} /> */}
                        <p style={{ color: "red" }}>{errors.userName?.message}</p>
                    </FormControl>
                    <FormControl size="medium" fullWidth variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            {...register("password")}
                            id="password"
                            type={passwordShown ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword}
                                        edge="end"
                                    >
                                        {passwordShown ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {/* <input {...register("password")} type={passwordShown ? "text" : "password"} /> */}
                        <p style={{ color: "red" }}>{errors.password?.message}</p>
                    </FormControl>
                </Grid>
                <Grid item container xs={12}>
                    <FormControl size="medium" fullWidth>
                        <InputLabel id="client-type">Client</InputLabel>
                        <Select fullWidth
                            {...register("clientType")} label="Client Type">
                            <MenuItem value={"COMPANY"}>Company</MenuItem>
                            <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ADMINISTRATOR"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <p style={{ color: "red" }}>{errors.clientType?.message}</p>

                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} ></Grid>
                    <Grid item xs={4}>
                        <Button type="submit" variant="contained">Login </Button>
                    </Grid>
                    <Grid item xs={4} ></Grid>
                </Grid>
            </Grid>
        </Container>
    </form>;
}

// type InputWithIconProps = {
//     text: string,
//     icon: any,
//     type: string,
//     onIconClick: () => void
//     register: any
// }
// const InputWithIcon = (props: InputWithIconProps) => {
//     return <FormControl size="medium" fullWidth variant="outlined">
//         <InputLabel htmlFor={props.text}>{props.text}</InputLabel>
//         <OutlinedInput
//             {...props.register(props.text)}
//             id="password"
//             type={props.type}
//             endAdornment={
//                 <InputAdornment position="end">
//                     <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={props.onIconClick}
//                         edge="end"
//                     >
//                         {props.icon}
//                     </IconButton>
//                 </InputAdornment>
//             }
//             label={props.text}
//         />
{/* <input {...register("password")} type={passwordShown ? "text" : "password"} /> */ }

    // </FormControl>
// }