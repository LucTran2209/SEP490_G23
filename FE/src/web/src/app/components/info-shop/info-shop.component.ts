import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RentalShopOutputDto } from '../../interfaces/rental-shop.interface';
import { IPayLoad } from '../../interfaces/account.interface';
import { StorageService } from '../../services/storage.service';
import { LocalStorageKey } from '../../utils/constant';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrl: './info-shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoShopComponent implements OnInit, AfterViewChecked {
  @Input() totalProduct: number | null = null;
  @Input() shopInfo?: RentalShopOutputDto | null;
  @Input() isOpen?: boolean;
  @Output() handleRentalMoreProduct = new EventEmitter();
  userCurrent?: IPayLoad;

  rentalMoreProduct(val: boolean) {
    this.handleRentalMoreProduct.emit(val);
  }
  calculateTime(inputTime: string | undefined): string {
    if (!inputTime) {
      return 'Chưa xác định';
    }

    const inputDate = new Date(inputTime);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime())) {
      return 'Ngày không hợp lệ';
    }

    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const daysInMonth = 30;
    const monthsInYear = 12;

    if (diffInDays > daysInMonth * monthsInYear) {
      const years = Math.floor(diffInDays / (daysInMonth * monthsInYear));
      return `${years} Năm Trước`;
    } else if (diffInDays > daysInMonth) {
      const months = Math.floor(diffInDays / daysInMonth);
      return `${months} Tháng Trước`;
    } else {
      return `${diffInDays} Ngày Trước`;
    }
  }

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngAfterViewChecked(): void {
   
  }
}
