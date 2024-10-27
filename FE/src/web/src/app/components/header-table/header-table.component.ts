import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { OptionSelectCheckBox } from '../../configs/anonymous.config';

@Component({
  selector: 'app-header-table',
  templateUrl: './header-table.component.html',
  styleUrl: './header-table.component.scss',
})
export class HeaderTableComponent {
  allChecked = false;
  overlayMenuToggle: boolean = false;
  indeterminate = true;
  listOptionCheckBox: OptionSelectCheckBox[] = [
    {
      value: 'maDonHang',
      label: 'Mã đơn hàng',
      checked: true,
    },
    {
      value: 'ngayTao',
      label: 'Ngày tạo',
      checked: true,
    },
    {
      value: 'nguoiThue',
      label: 'Người thuê',
      checked: true,
    },
    {
      value: 'soDienThoai',
      label: 'Số điện thoại',
      checked: true,
    },
    {
      value: 'thoiGianThue',
      label: 'Thời gian thuê',
      checked: true,
    },
    {
      value: 'giaCoc',
      label: 'Giá cọc',
      checked: true,
    },
    {
      value: 'tongTien',
      label: 'Tổng tiền',
      checked: true,
    },
    {
      value: 'noiDung',
      label: 'Nội dung',
      checked: true,
    },
    {
      value: 'trangThaiDonHang',
      label: 'Trạng thái đơn hàng',
      checked: true,
    },
    {
      value: 'trangThaiThanhToan',
      label: 'Trạng thái thanh toán',
      checked: true,
    },
  ];
  @Output() handleChooseCell = new EventEmitter<any>();
  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.listOptionCheckBox = this.listOptionCheckBox.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.listOptionCheckBox = this.listOptionCheckBox.map((item) => ({
        ...item,
        checked: false,
      }));
    }
  }

  onToogleMenu(){
    this.overlayMenuToggle = false;
  }

  onApply() {
    this.handleChooseCell.emit(this.listOptionCheckBox);
    this.overlayMenuToggle = true
  }

}
