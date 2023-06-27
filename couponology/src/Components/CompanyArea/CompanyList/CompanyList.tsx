import { useCallback, useContext, useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/Company";
import AdminService from "../../../Services/AdminService";
import NotyfContext from "../../../Services/NotyfContext";
import { CompanyPreview } from "../CompanyPreview/CompanyPreview";
import { AxiosError } from "axios";
import { Notyf } from "notyf";
import { Box, Button, Container, Divider } from '@mui/material';
import Popup from "reactjs-popup";
import { CompanyForm } from "../CompanyPreview/CompanyForm";


export function AlertForConnection(err: AxiosError, notyf: Notyf) {
    if (err.response?.status === 401) {
        notyf.error("Not connected, Please reconnect!")
    }
}
var adminService = new AdminService();
export function CompanyList() {
    const notyf = useContext(NotyfContext)
    const [companyId, setCompanyId] = useState(0)
    const [filteredCompany, setFilteredCompany] = useState<CompanyModel>();
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const getList = useCallback(
        async () => {
            let url = ""
            try {
                var companyList = await adminService.getAllCompanies();
                setCompanies(companyList);
            } catch (err: any) {
                AlertForConnection(err, notyf)
            }
        }, [notyf])

    const findCompanyById = async () => {
        try {
            let res = await adminService.getCompany(companyId);
            setFilteredCompany(res);
        } catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response?.status === 400) {
                notyf.error("Company was not found")
                setFilteredCompany(undefined);
            }
        }
    }

    useEffect(() => {
        getList()
    }, [getList]);

    async function DeleteCompany(id: number) {
        try {
            let res = await adminService.deleteCompany(id)
            setCompanies(companies.filter(company => company.id !== id));
            notyf.success("Company deleted successfully")
        }
        catch (err: any) {
            AlertForConnection(err, notyf)
            if (err.response?.status === 400) {
                notyf.error("Company was not found")
            }
        }
    }

    return (
        <Box height={"100%"} overflow={"auto"}>
            <input type="number" value={companyId} onChange={s => setCompanyId(s.target.value === "" ? 0 : parseInt(s.target.value))} />
            <Button variant="outlined" onClick={findCompanyById} >Find Company By Id </Button>
            <br />
            {filteredCompany !== undefined && <Button variant="outlined" onClick={() => setFilteredCompany(undefined)}>Show All Companies</Button>}
            <br />
            <h1> Company List</h1>
            <br />
            <Popup trigger={<Button variant="contained"> Create New Company</Button>} position="center center">
                <CompanyForm updateListData={getList} isUpdate={false} />
            </Popup>
            <br />
            {filteredCompany === undefined && companies?.map(c => <CompanyPreview company={c} deleteCompany={DeleteCompany} key={c.id} getList={getList} />
            )}
            {filteredCompany !== undefined && <CompanyPreview company={filteredCompany} deleteCompany={DeleteCompany} getList={getList} />}
        </Box>
    );



}
export default CompanyList;