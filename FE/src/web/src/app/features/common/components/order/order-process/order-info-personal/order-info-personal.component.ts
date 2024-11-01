import { Component, Input } from '@angular/core';
import { ProductRentalOrderProcess } from '../../../../../../interfaces/product.interface';

export type TableProductRentalOrderProcess = Omit<
  ProductRentalOrderProcess,
  'timeStart' | 'timeEnd' | 'note' | 'paymentMethod' | 'numberOfDay'
>;
@Component({
  selector: 'app-order-info-personal',
  templateUrl: './order-info-personal.component.html',
  styleUrl: './order-info-personal.component.scss',
})
export class OrderInfoPersonalComponent {
  @Input() listProductRentalProcess?: TableProductRentalOrderProcess[];
  demoValue = 1;

  get calTotalPriceDeposit(): number {
    return (
      this.listProductRentalProcess?.reduce(
        (acc, current) => acc + current.depositPriceRequest,
        0
      ) || 0
    );
  }

  get calTotalPriceRental(): number {
    return (
      this.listProductRentalProcess?.reduce(
        (acc, current) => acc + current.rentalPriceRequest,
        0
      ) || 0
    );
  }
}
