import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { FeatureAppState } from '../../../../store/app.state';
import { getDetailProductRental } from '../../state/product/product-detail.actions';
import { selectData } from '../../state/product/product-detail.reducer';

@Component({
  selector: 'app-product-rental-detail',
  templateUrl: './product-rental-detail.component.html',
  styleUrl: './product-rental-detail.component.scss',
})
export class ProductRentalDetailComponent {
  isVisible: boolean = false;
  productDetail$?: Observable<ProductItemResponse>;


  showRentalForm() {
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }

  selectStateFromNgRx(){
    this.productDetail$ = this.store.select(selectData);
  }

  dispatchActionNessarray(){
    const param = this.router.snapshot.paramMap.get("id");
    if(param){
      this.store.dispatch(getDetailProductRental({productId: param}));
    }
  }

  constructor(private router: ActivatedRoute, private store: Store<FeatureAppState>) {}

  ngOnInit(): void {
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
  }
}
