import { OrderItem } from './OrderItem';
import {OrderState} from './OrderState';
export class Order{

    id: number = 0;
    deliveryAddress: string = '';
    purchaserId:number=-1;
    items: OrderItem[] = [];
    price: number = 0;
    state :OrderState=OrderState.created;
    created:Date=new Date()
    started:Date=new Date()
    ended:Date=new Date();
    deliveryTime:number=0;
    comment:String="";

    public ToString(orderItem: OrderItem) {
      return (
        'ID: ' +
        orderItem.id +
        'Name: ' +
        orderItem.name +
        'Quantity: '+
        orderItem.quantity+
        'Price: ' +
        orderItem.price
      );
    }
}