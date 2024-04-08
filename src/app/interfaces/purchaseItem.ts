import { Product } from "./product";
import { Purchase } from "./purchase";

export interface PurchaseItem{
    id? : number,
    purchase? : Purchase,
    product? : Product
}