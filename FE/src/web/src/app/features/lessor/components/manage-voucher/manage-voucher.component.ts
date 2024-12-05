import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../../services/navigation.service';
import { LoadingService } from '../../../../services/loading.service';
import { OptionSelectCheckBox } from '../../../../configs/anonymous.config';
import { NzCustomColumn } from 'ng-zorro-antd/table';
import { VoucherDetailResultService, VoucherEditInputDto, VoucherInputDto, VoucherOutputDto, VoucherResultService } from '../../../../interfaces/voucher.interface';
import { VoucherService } from '../../../../services/voucher.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrl: './manage-voucher.component.scss',
})
export class ManageVoucherComponent {
  voucherInformation!: VoucherInputDto;
  voucherId: string = '';
  listData: VoucherOutputDto[] = [];
  customColumn: CustomColumns[] = [
    {
      name: 'Mã Khuyến Mãi',
      value: 'maVoucher',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Giá Trị Giảm Giá',
      value: 'giaTri',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Ngày Bắt Đầu',
      value: 'ngayBatDau',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Ngày Kết Thúc',
      value: 'ngayKetThuc',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Thời gian thuê',
      value: 'thoiGianThue',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Nội dung',
      value: 'noiDung',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Trạng thái',
      value: 'trangThai',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Chỉnh Sửa',
      value: 'chinhSua',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Xóa',
      value: 'xoa',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigateService: NavigationService,
    private voucherService: VoucherService,
    private loadingSerivce: LoadingService,
    private cdRef: ChangeDetectorRef,
    private userProfileService: UserProfileService, 
    private messageService: MessageResponseService,
    private modal: NzModalService, 

  ) {}

  handleChooseViewCell(arr: OptionSelectCheckBox[]) {
    this.customColumn = this.customColumn.map((item, index) => ({
      ...item,
      default: arr[index].checked,
    }));
  }

  onSubmitForm(voucher: VoucherInputDto) {
    voucher.shopId = this.userProfileService.rentalshopId ?? '';
    this.voucherService.createVoucher(voucher).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Tạo Voucher Mới Thành Công!');
        this.onloadVoucher();  
        
      },
      error: (error) => {
        this.messageService.handleError('Tạo Voucher Mới thất bại!');
      }
    });
  }
  onUpdateSubmitForm(voucher: VoucherEditInputDto) {
    this.voucherService.updateVoucher(this.voucherId, voucher).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Cập Nhật Voucher Thành Công!');
        this.onloadVoucher();
        this.voucherId = '';
      },
      error: (error) => {
        this.messageService.handleError('Cập Nhật Voucher thất bại!');
      }
    });
  }

  async onloadVoucher() {
    this.loadingSerivce.setLoading();
    const id = this.userProfileService.rentalshopId;
    this.voucherService.listVoucher(id ?? '').subscribe((res: VoucherResultService) => {
      this.listData = res.data
      this.loadingSerivce.setOtherLoading('loaded');
    });
  }
  getVoucherById(voucherId: string) {
    this.loadingSerivce.setLoading();
    this.voucherService.getVoucher(voucherId).subscribe({
      next: (res: VoucherDetailResultService) => {
        this.voucherInformation = res.data[0];
        this.voucherId = voucherId;
        console.log('Voucher Information:', this.voucherInformation);
        this.loadingSerivce.setOtherLoading('loaded');
      },
      error: (error) => {
        this.messageService.handleError('Lấy thông tin voucher thất bại!');
        console.error('Error:', error);
      },
    });
  }
  deactiveVoucher(voucherId: string){
    this.modal.error({
      nzTitle: '<b class="uppercase">Dừng Chương Trình Khuyến Mãi</b>',
      nzContent: '<p class="py-3 text-red-300">Bạn chắc chắn muốn dừng chương trình khuyến mãi này không?</p>',
      nzOkText: 'Dừng',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
      {
        this.voucherService.deactivateVoucher(voucherId).subscribe({
          next: (response) => {
            this.messageService.showSuccess('Dừng Chương Trình Khuyến Mãi Thành Công!');
            this.onloadVoucher();
            this.voucherId = '';
            
          },
          error: (error) => {
            this.messageService.handleError('Dừng Chương Trình Khuyến Mãi thất bại!');
          }
        });
      },
      nzCancelText: 'Không',
      nzOnCancel: () => this.messageService.showInfo('Bạn Đã Hủy! Không Dừng Chương Trình Khuyến Mãi!')
    });

  }
  deleteVoucher(voucherId: string){
    this.modal.error({
      nzTitle: '<b class="uppercase">Xóa Chương Trình Khuyến Mãi</b>',
      nzContent: '<p class="py-3 text-red-300">Bạn chắc chắn muốn xóa chương trình khuyến mãi này không?</p>',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
      {
        this.voucherService.deleteVoucher(voucherId).subscribe({
          next: (response) => {
            this.messageService.showSuccess('Xóa Khuyến Mãi Thành Công!');
            this.onloadVoucher();
            this.voucherId = '';
            
          },
          error: (error) => {
            this.messageService.handleError('Xóa Khuyến Mãi thất bại!');
          }
        });
      },
      nzCancelText: 'Không',
      nzOnCancel: () => this.messageService.showInfo('Bạn Đã Hủy! Không Xóa Khuyến Mãi!')
    });
  }

  ngOnInit(): void {
    this.onloadVoucher();
  }
}

interface CustomColumns extends NzCustomColumn {
  name: string;
  position?: 'left' | 'right';
}