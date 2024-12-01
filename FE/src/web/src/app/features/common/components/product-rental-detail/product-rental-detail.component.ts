import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { FeatureAppState } from '../../../../store/app.state';
import { getDetailProductRental, resetProductRental } from '../../state/product/product-detail.actions';
import { selectData } from '../../state/product/product-detail.reducer';
import { resetRentalProduct } from '../../state/rental/rental.actions';
import { MessageResponseService } from '../../../../services/message-response.service';
import { ChatFireStoreService } from '../../../../services/chat-fire-store.service';
import { IPayLoad } from '../../../../interfaces/account.interface';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageKey } from '../../../../utils/constant';
import { FeedbackOutputDto, FeedbackResultService } from '../../../../interfaces/feedback.interface';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-product-rental-detail',
  templateUrl: './product-rental-detail.component.html',
  styleUrl: './product-rental-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRentalDetailComponent implements OnDestroy{
  isVisible: boolean = false;
  comments: FeedbackOutputDto[] = [];
  productDetail$?: Observable<ProductItemResponse>;
  userCurrent?: IPayLoad
  navigateToShop(id: string) {
    this.route.navigate(['/common/shop', id]);
  }

  showRentalForm() {
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }

  chatShop(val: ProductItemResponse){
    if(!this.userCurrent){
      this.messageResponseService.handleError('Bạn cần đăng nhập để trò chuyện!', 401);
      this.route.navigateByUrl('/auth/login');
      return;
    }
    else {
      console.log('chat with shop', val);
      this.chatFireStoreService.addChatRoom(val.rentalShop.userId);
    }
  }


  onPreventAccess(){
    this.messageResponseService.showPreventAccess("Tính năng đang phát triển",'');
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
  loadComments() {
    const productId = this.router.snapshot.paramMap.get('id');
    if (productId) {
      this.orderService.listFeedBack(productId).subscribe({
        next: (res: FeedbackResultService) => {
          this.comments = res.data;
        },
        error: (err) => {
          console.error('Lỗi khi tải bình luận:', err);
          this.messageResponseService.handleError('Không thể tải bình luận', 500);
        },
      });
    } else {
      console.warn('Không tìm thấy productId');
    }
   
  }

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private store: Store<FeatureAppState>,
    private messageResponseService: MessageResponseService,
    private chatFireStoreService: ChatFireStoreService,
    private storageService: StorageService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadComments();
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetRentalProduct());
    this.store.dispatch(resetProductRental());
    this.storageService.unset(LocalStorageKey.rangeDate);
  }
}
