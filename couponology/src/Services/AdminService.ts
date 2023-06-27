import axios from "axios";
import { CompanyModel } from "../Models/Company";
import { CustomerModel } from "../Models/Customer";
import { LoginReq } from "../Components/AuthArea/Login/Login";


class AdminService {
  public async addCompany(company: CompanyModel) {
    return (await axios.post('http://localhost:8080/api/admin/company', company));
  }
  public async addCustomer(customer: CustomerModel) {
    return (await axios.post('http://localhost:8080/api/admin/customer', customer));
  }
  public async getAllCompanies() {
    return (await axios.get<CompanyModel[]>('http://localhost:8080/api/admin/companies')).data;
  }
  public async getCompany(id: number) {
    return (await axios.get<CompanyModel>('http://localhost:8080/api/admin/companies/' + id)).data;
  }
  public async updateCompany(company: CompanyModel) {
    return await axios.put('http://localhost:8080/api/admin/company/' + company.id, company)
  }
  public async deleteCompany(id: number) {
    return (await axios.delete('http://localhost:8080/api/admin/company/' + id)).data;
  }
  public async getAllCustomers() {
    return (await axios.get<CustomerModel[]>('http://localhost:8080/api/admin/customers')).data;
  }
  public async getCustomer(id: number) {
    return (await axios.get<CustomerModel>('http://localhost:8080/api/admin/customers/' + id)).data;
  }
  public async updateCustomer(customer: CustomerModel) {
    return await axios.put('http://localhost:8080/api/admin/customers/' + customer.id, customer);
  }
  public async deleteCustomer(id: number) {
    return (await axios.delete('http://localhost:8080/api/admin/customers/' + id)).data;
  }
  public async login(data: LoginReq) {
    return (await axios.post<{ token: string }>('http://localhost:8080/api/admin/login', data));
  }
}

export default AdminService;
