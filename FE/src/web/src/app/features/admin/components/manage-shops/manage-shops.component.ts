import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestShopDto } from '../../../../interfaces/request-shop.interface';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { StorageService } from '../../../../services/storage.service';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-manage-shops',
  templateUrl: './manage-shops.component.html',
  styleUrl: './manage-shops.component.scss'
})
export class ManageShopsComponent implements OnInit {
  rentalList: RequestShopDto[] = [];
  totalRentals = 0;     
  currentPage = 1;    
  pageSize = 10; 
  loading$?: Observable<StatusProcess>;
  isloading = false;
  searchText: string = '';

  constructor(
    private rentalShopService: RentalShopService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private loadingService: LoadingService,
    private messageService: MessageResponseService,
  ) 
  {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void {
    this.loadRentals(this.currentPage, this.pageSize);
  }
  loadRentals(pageIndex: number, pageSize: number) {
    this.isloading = true;
    this.rentalShopService.listRentalShop(pageIndex, pageSize).subscribe((res) => {
      this.rentalList = res.data.items;
      this.totalRentals = res.data.totalCount;
      this.loadingService.setOtherLoading('loaded');
      this.isloading = false;
    });
  }
  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.loadRentals(this.currentPage, this.pageSize);
  }
  onSearch(){

  }
}
