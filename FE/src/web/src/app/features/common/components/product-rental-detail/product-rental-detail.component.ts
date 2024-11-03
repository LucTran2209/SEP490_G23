import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { FeatureAppState } from '../../../../store/app.state';
import { getDetailProductRental, resetProductRental } from '../../state/product/product-detail.actions';
import { selectData } from '../../state/product/product-detail.reducer';
import { resetRentalProduct } from '../../state/rental/rental.actions';

@Component({
  selector: 'app-product-rental-detail',
  templateUrl: './product-rental-detail.component.html',
  styleUrl: './product-rental-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRentalDetailComponent implements OnDestroy{
  isVisible: boolean = false;
  productDetail$?: Observable<ProductItemResponse>;

  navigateToShop(id: string) {
    this.route.navigate(['/common/shop', id]);
  }

  showRentalForm() {
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }

  selectStateFromNgRx() {
    this.productDetail$ = this.store.select(selectData);
  }

  dispatchActionNessarray() {
    const param = this.router.snapshot.paramMap.get('id');
    if (param) {
      this.store.dispatch(getDetailProductRental({ productId: param }));
    }
  }

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private store: Store<FeatureAppState>
  ) {}

  ngOnInit(): void {
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetRentalProduct());
    this.store.dispatch(resetProductRental());
  }
}
