import { CompanyModel } from "../../../Models/Company"

type CompanyAboutProps ={
    company: CompanyModel
}
export const CompanyAbout = (props:CompanyAboutProps) => {
    return <div>
        <div>Name: {props.company.name}</div>        
        </div>
}