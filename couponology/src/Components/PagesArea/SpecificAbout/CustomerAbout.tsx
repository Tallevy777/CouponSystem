import { CustomerModel } from "../../../Models/Customer"

type CustomerAboutProps = {
    customer: CustomerModel
}
export const CustomerAbout = (props: CustomerAboutProps) => {
    return <div>
        <div>First Name: {props.customer.firstName}</div>
        <div>Last Name: {props.customer.lastName}</div>
    </div>
}