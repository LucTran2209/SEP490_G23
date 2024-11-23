import { Component, OnInit } from '@angular/core';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

export interface IItemProcessRental {
  iconContent: string;
  key: string | number;
  content: string;
  title: string;
}

type OptionSelectWithSlug = OptionSelect & {
  slug: string;
};
@Component({
  selector: 'app-howitorder',
  templateUrl: './howitorder.component.html',
  styleUrl: './howitorder.component.scss',
})
export class HowitorderComponent implements OnInit {
  menuSatic: OptionSelectWithSlug[] = menuHowItOrder;
  commonProcessRental_lessor: IItemProcessRental[] =
    contentCardProcessRental_lessor;
  commonProcessRental_renter: IItemProcessRental[] =
    contentCardProcessRental_renter;
  tabChoose?: number = 0;
  tabLeftChoose?: number = 0;

  chooseTab(val: NzTabChangeEvent) {
    const hash = val.index === 0 ? 'lessor' : 'renter';
    this.tabChoose = val.index;
    this.router.navigate([], {
      fragment: hash,
      replaceUrl: true,
    });
  }

  onViewTabLeft(val: any, slug: string) {
    this.tabLeftChoose = val;
    this.router.navigate([], {
      queryParams: { slug: slug },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  constructor(private router: Router, private activeRouter: ActivatedRoute) {}
  ngOnInit(): void {}
  //rentalProduct
  openRentalProductSections = [false, false, false, false, false];

  toggleRentalProductSection(index: number): void {
    this.openRentalProductSections[index] = !this.openRentalProductSections[index];
  }
  //payment
  openPaymentSections = [false, false, false, false, false, false, false, false];
  togglePaymentSection(index: number): void {
    this.openPaymentSections[index] = !this.openPaymentSections[index];
  }
  //regulations
  openRegulationSections = [false, false, false, false, false, false];
  toggleRegulationSection(index: number): void {
    this.openRegulationSections[index] = !this.openRegulationSections[index];
  }
}

export const contentCardProcessRental_lessor: IItemProcessRental[] = [
  {
    key: 1,
    iconContent: 'vertical-left',
    title: 'Đăng ký thành viên',
    content:
      'Để có thể thuê thiết bị, bạn cần đăng ký tài khoản và đăng nhập vào hệ thống. Bạn có thể sử dụng số điện thoại cá nhân hoặc thông qua các nền tảng bên thứ 3 như Google, Facebook,... Bạn cần phải xác thực số điện thoại trước khi đăng ký thuê thiết bị.',
  },
  {
    key: 2,
    iconContent: 'snippets',
    title: 'Đăng ký thiết bị cho thuê',
    content:
      'Để đăng ký thiết bị, bạn cần cung cấp thông tin cơ bản, mô tả và hình ảnh thiết bị lên hệ thống. Chọn mức giá cho thuê mong muốn và các yêu cầu khác. Đăng ký thiết bị cho thuê Tại đây',
  },
  {
    key: 3,
    iconContent: 'camera',
    title: 'Hệ thống duyệt thiết bị',
    content:
      'Sau khi đăng ký thiết bị, hệ thống sẽ kiểm duyệt thông tin thiết bị của bạn và thông báo kết quả qua ứng dụng. Trong trường hợp các yêu cầu đã được đáp ứng, thiết bị sẽ được đăng lên cho khách thuê. ',
  },
  {
    key: 4,
    iconContent: 'bell',
    title: 'Nhận và phản hồi yêu cầu thuê thiết bị',
    content:
      'Khi có khách gửi yêu cầu thuê thiết bị, chủ sở hữu sẽ nhận được thông báo từ hệ thống. Bạn cần kiểm tra thông tin của khách và xác nhận cho thuê thiết bị. Nếu khách thuê và thiết bị đều đáp ứng yêu cầu, việc thuê sẽ được tiến hành.',
  },
  {
    key: 5,
    iconContent: 'key',
    title: 'Bàn giao thiết bị',
    content:
      'Chủ sở hữu và khách thuê sẽ gặp nhau để bàn giao thiết bị. Kiểm tra giấy tờ xác minh, tình trạng thiết bị và các thủ tục khác liên quan đến cọc thuê (nếu có). Bàn giao thiết bị và hướng dẫn sử dụng để khách có trải nghiệm tốt.',
  },
  {
    key: 6,
    iconContent: 'like',
    title: 'Kết thúc hợp đồng và đánh giá',
    content:
      'Khách thuê sẽ hoàn trả thiết bị sau khi kết thúc hợp đồng thuê. Chủ sở hữu kiểm tra tình trạng thiết bị, đảm bảo không có hư hỏng. Cả hai bên có thể đánh giá nhau để hệ thống ghi nhận, cải thiện dịch vụ và duy trì tính minh bạch',
  },
];

export const contentCardProcessRental_renter: IItemProcessRental[] = [
  {
    key: 1,
    content:
      'Để bắt đầu thuê thiết bị, bạn cần đăng ký tài khoản và đăng nhập vào hệ thống. Bạn có thể sử dụng số điện thoại cá nhân hoặc thông qua các nền tảng bên thứ ba như Google, Facebook... Bạn cần phải xác thực số điện thoại trước khi tiến hành thuê thiết bị',
    iconContent: 'vertical-left',
    title: 'Đăng ký tài khoản',
  },
  {
    key: 2,
    content:
      'Sử dụng hệ thống tìm kiếm để chọn loại thiết bị bạn muốn thuê. Bạn có thể lọc theo các tiêu chí như loại thiết bị, giá thuê, thời gian thuê, và khu vực. Hệ thống sẽ hiển thị danh sách thiết bị phù hợp để bạn lựa chọn',
    iconContent: 'search',
    title: 'Tìm kiếm thiết bị',
  },
  {
    key: 3,
    content:
      'Sau khi chọn thiết bị phù hợp, bạn tiến hành đặt thuê. Xác định thời gian và địa điểm mong muốn nhận thiết bị. Bạn cũng cần đọc kỹ các điều khoản thuê để hiểu rõ quyền lợi và trách nhiệm của mình.',
    iconContent: 'camera',
    title: 'Đặt thuê thiết bị',
  },
  {
    key: 4,
    content:
      'Để đảm bảo việc đặt thuê thiết bị, bạn cần thanh toán tiền cọc. Hệ thống sẽ cung cấp các phương thức thanh toán an toàn như chuyển khoản, ví điện tử... Sau khi thanh toán, thiết bị sẽ được giữ cho bạn.',
    iconContent: 'credit-card',
    title: 'Thanh toán tiền cọc',
  },
  {
    key: 5,
    content:
      'Đến địa điểm đã thỏa thuận để nhận thiết bị. Kiểm tra tình trạng thiết bị cùng với người cho thuê và đảm bảo rằng thiết bị hoạt động đúng yêu cầu. Nhận các giấy tờ liên quan nếu cần và hoàn tất quá trình nhận thiết bị.',
    iconContent: 'key',
    title: 'Nhận thiết bị',
  },
  {
    key: 6,
    content:
      'Sau khi kết thúc thời gian thuê, bạn trả lại thiết bị đúng thời gian và địa điểm. Người cho thuê sẽ kiểm tra tình trạng thiết bị và xác nhận hoàn trả. Sau đó, bạn có thể đánh giá trải nghiệm thuê để giúp cải thiện chất lượng dịch vụ trong tương lai.',
    iconContent: 'like',
    title: 'Trả thiết bị và đánh giá',
  },
];

export const menuHowItOrder: OptionSelectWithSlug[] = [
  {
    label: 'Hưỡng dẫn chung',
    value: 'Hưỡng dẫn chung',
    slug: 'guide-common',
  },
  {
    label: 'Hưỡng dẫn thuê sản phẩm',
    value: 'Hưỡng dẫn thuê sản phẩm',
    slug: 'guide-rental-product',
  },
  {
    label: 'Hưỡng dẫn thanh toán',
    value: 'Hưỡng dẫn thanh toán',
    slug: 'guide-payment',
  },
  {
    label: 'Quy chế hoạt động',
    value: 'Quy chế hoạt động',
    slug: 'regulations',
  },
];

const guideDetailRentalProduct: any = [{}];
