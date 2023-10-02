import { Notyf } from "notyf";
import AdminService from "../../../Services/AdminService";
import { CompanyModel } from "../../../Models/Company";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { CompanyForm } from "./CompanyForm";
import { Card, Container } from "@mui/material";


export var notyf = new Notyf();
var adminService = new AdminService();
interface CompanyPreviewProps {
    company: CompanyModel;
    deleteCompany: (id: number) => void
    getList: () => void;
}
export function CompanyPreview(props: CompanyPreviewProps): JSX.Element {
    return (
        // <Container maxWidth="sm">
        // <Card variant="outlined">
        <div className="CompanyPreview">
            <br />
            <div className="card">
                <img className="image" src="https://i0.wp.com/www.iedunote.com/img/23559/what-is-a-company-scaled.jpg" alt="Company" />
                <h1>{props.company.name}</h1>
                <p> {props.company.email}</p>
                <p> {props.company.password}</p>
                <p> <button onClick={() => props.deleteCompany(props.company.id!)}>Delete</button></p>
                <Popup trigger={<button> Update</button>} position="center center">
                    <CompanyForm company={props.company} isUpdate={true} updateListData={props.getList} />
                </Popup>
            </div>
        </div>
        // </Card>
        // </Container>
    );

} 