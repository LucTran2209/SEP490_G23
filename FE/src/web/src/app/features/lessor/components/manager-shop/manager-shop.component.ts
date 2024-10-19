import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductOutputDto, ProductResultService } from '../../../../interfaces/product.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '../../../../services/product.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-manager-shop',
  templateUrl: './manager-shop.component.html',
  styleUrl: './manager-shop.component.scss'
})
export class ManagerShopComponent  implements OnInit{
  isVisible : boolean = false;
  productList: ProductOutputDto[] = [];
  constructor(private modal: NzModalService, 
    private productService: ProductService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>
  ) 
  {}
  
  showCreateProduct(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  ngOnInit(): void{
    this.loadProducts();
  }
  loadProducts(){
    this.productService.listProduct().subscribe((res: ProductResultService) =>{
      this.productList = res.data;
      console.log(res)
    });
    // this.store.dispatch(AdminActions.load_users({ pageIndex, pageSize }));
  }
}
