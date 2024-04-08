import { PurchaseItem } from "./purchaseItem";
import { User } from "./user";

export interface Purchase{
    id? : number,
    user? : User,
    items? : PurchaseItem[],
    total?: number,
}