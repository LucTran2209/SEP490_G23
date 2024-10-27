import { Component } from '@angular/core';
import { NzCustomColumn } from 'ng-zorro-antd/table';
import { OptionSelectCheckBox } from '../../../../configs/anonymous.config';
import { ActivatedRoute, Router } from '@angular/router';

interface CustomColumns extends NzCustomColumn {
  name: string;
  position?: 'left' | 'right';
}

interface IData {
  maDonHang: string | number;
  ngayTao: string;
  nguoiThue: string;
  soDienThoai: string;
  thoiGianThue: string;
  giaCoc: string;
  tongTien: string;
  noiDung: string;
  trangThaiDonHang: string;
  trangThaiThanhToan: string;
}
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
})
export class ManageOrderComponent {
  listOfData: IData[] = mockData;
  customColumn: CustomColumns[] = [
    {
      name: 'Mã đơn hàng',
      value: 'maDonHang',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Ngày tạo',
      value: 'ngayTao',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Người thuê',
      value: 'nguoiThue',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Số điện thoại',
      value: 'soDienThoai',
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
      name: 'Giá cọc',
      value: 'giaCoc',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Tổng tiền',
      value: 'tongTien',
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
      name: 'Trạng thái đơn hàng',
      value: 'trangThaiDonHang',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Trạng thái thanh toán',
      value: 'trangThaiThanhToan',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
  ];

  handleChooseViewCell(arr: OptionSelectCheckBox[]) {
    this.customColumn = this.customColumn.map((item, index) => ({
      ...item,
      default: arr[index].checked,
    }));
  }

  onSelectDetail(val: IData){
    console.log('data',val);
    this.route.navigateByUrl(`lessor/order/${val.maDonHang}`);
  }

  constructor(private route: Router) {}
}

const mockData = [
  {
    maDonHang: 11,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'namnh123',
    soDienThoai: '0327033756',
    thoiGianThue: '20 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Đang giao',
    trangThaiThanhToan: 'Thanh toán cọc',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
  {
    maDonHang: 12,
    ngayTao: '03:49:14 - 27/09/2024',
    nguoiThue: 'cuongqt123',
    soDienThoai: '0327033756',
    thoiGianThue: '5 ngày',
    giaCoc: '200.000',
    tongTien: '500.000',
    noiDung: 'Cong tien giao dich 123456',
    trangThaiDonHang: 'Thành công',
    trangThaiThanhToan: 'Thanh toán tất cả',
  },
];
