import { Component } from '@angular/core';

@Component({
  selector: 'app-we-bring',
  templateUrl: './we-bring.component.html',
  styleUrl: './we-bring.component.scss'
})
export class WeBringComponent {
 listWeBring = [
  {
    title: "Dành cho Người Thuê",
    desc: "Tìm kiếm sản phẩm phù hợp một cách dễ dàng 🛒 Khám phá hàng ngàn sản phẩm cho thuê từ khắp nơi",
    link: '#see-detail'
  },
  {
    title: "Dành cho Người Cho Thuê",
    desc: "Đăng sản phẩm cho thuê chỉ trong vài bước 📦 Tiếp cận nhiều khách hàng và tăng doanh thu của bạn",
    link: '#see-detail'
  },
  {
    title: "Dành cho Người Cho Thuê",
    desc: "Đăng sản phẩm cho thuê chỉ trong vài bước 📦 Tiếp cận nhiều khách hàng và tăng doanh thu của bạn",
    link: '#see-detail'
  },
  {
    title: "Cách Hoạt Động",
    desc: "Kết nối người thuê và người cho thuê dễ dàng, nhanh chóng 🔗 Hiệu quả, an toàn và thân thiện với người dùng",
    link: '#see-detail'
  },
 ]
}
