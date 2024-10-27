import { Component, OnInit } from '@angular/core';
import { NzCustomColumn } from 'ng-zorro-antd/table';

interface IOrderDetail {
  nguoiThue: string;
  soDienThoai: string;
  email: string;
  ngayTao: string;
  thoiGianThue: string;
  maDonHang: string | number;
  quantityProduct: number | string;
  giaCoc: string;
  tongTien: string;
  trangThaiDonHang: string;
  trangThaiThanhToan: string;
  address: string;
}
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit{
  allChecked = false;
  orderDetail: IOrderDetail = mockData;
  listOfData = mockData2;

  onAllChecked(checked: boolean): void {
    this.listOfData.forEach((item) => (item.checked = checked));
  }

  onItemChecked(): void {
    this.allChecked = this.listOfData.every((item) => item.checked);
  }

  ngOnInit(): void {
    
  }
}

const mockData: IOrderDetail = {
  nguoiThue: 'Nam123',
  soDienThoai: '0559.123.456',
  email: 'nguyenvana@gmail.com',
  ngayTao: '04/09/2024  10:25',
  thoiGianThue: '20 ngày',
  address: 'Trang Ha, Tu Son, Bac Ninh',
  maDonHang: 'ABC12r14981',
  quantityProduct: 3,
  giaCoc: '- 300.000 VND',
  tongTien: '600.000 VND ',
  trangThaiThanhToan: 'Đã thanh toán cọc',
  trangThaiDonHang: 'Đang xử lý',
};
const mockData2 = [
  {
    checked: false,
    name: 'Thiết bị A',
    quantity: 3,
    deposit: 200000,
    rental: 400000,
    image: 'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  },
  {
    checked: false,
    name: 'Thiết bị A',
    quantity: 3,
    deposit: 200000,
    rental: 400000,
    image: 'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  },
  {
    checked: false,
    name: 'Thiết bị A',
    quantity: 3,
    deposit: 200000,
    rental: 400000,
    image: 'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  },
];
