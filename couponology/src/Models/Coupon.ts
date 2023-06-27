import { Category } from "./Category";
import { CompanyModel } from "./Company";

export class CouponModel {

    public id?: number;
    public category?: Category;
    public company?: CompanyModel;
    public title?: string;
    public description?: string;
    public startDate?: string;
    public endDate?: string;
    public amount?: number;
    public price?: number;
    public image?: string;
   
   
   
   
}