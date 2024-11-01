import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../../services/storage.service';
import { ProductRentalOrderProcess } from '../../../../../interfaces/product.interface';
import { LocalStorageKey } from '../../../../../utils/constant';
import { OrderCreateRequest } from '../../../../../interfaces/order.interface';
import { IPayLoad } from '../../../../../interfaces/account.interface';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrl: './order-process.component.scss'
})
export class OrderProcessComponent implements OnInit{
  orderProcess?: ProductRentalOrderProcess;
  typeMethodPayment: string | number = 0;
  currentUser?: IPayLoad;
  ngOnInit(): void {
    const orderProcessData = this.storageService.get(LocalStorageKey.orderProcess);
    const currentUserData = this.storageService.get(LocalStorageKey.currentUser);
    
    this.orderProcess = orderProcessData ? JSON.parse(orderProcessData) as ProductRentalOrderProcess : undefined;
    this.currentUser = currentUserData ? JSON.parse(currentUserData) as IPayLoad : undefined;
}

  onChoosePaymentMethod(val: string){
    this.typeMethodPayment = val;
  }

  onCreateOrder(){
    if(this.orderProcess && this.currentUser){
      const req: OrderCreateRequest = {
        address: "",
        userId: this.currentUser.UserId,
        endDate: this.orderProcess.timeEnd.toString(),
        note: this.orderProcess.note,
        paymentType: Number(this.typeMethodPayment),
        startDate: this.orderProcess.timeStart.toString(),
        totalPrice: this.orderProcess.rentalPriceRequest, 
        orderDetails: [
          {
            orderId: null,
            productId: this.orderProcess.productId,
            quantity: this.orderProcess.quantityRequest
          }
        ]
      }

      console.log('>>>> req',req);
    }
  }
  constructor(private storageService: StorageService){}
  
}
