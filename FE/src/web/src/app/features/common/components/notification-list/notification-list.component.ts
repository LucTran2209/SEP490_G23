import { Component } from '@angular/core';
import { CustomColumns } from '../../../lessor/components/manage-order/manage-order.component';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  listData = dataMock;
  listOptionViewNotification = listOptionChoose;
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  displayData: readonly any[] = [];
  selectValue:  FormControl<string | null> = new FormControl<string>('today');
  customColumn: CustomColumns[] = [
    {
      name: 'Tên thông báo',
      default: true,
      value: 'titleThongBao',
      width: 300,
      fixWidth: true,
      position: 'left',
    },
    {
      name: 'Nội dung thông báo',
      default: true,
      value: 'contentThongBao',
      width: 300,
      fixWidth: true,
      position: 'left',
    },
    {
      name: 'Thời gian',
      default: true,
      value: 'dateThongBao',
      width: 300,
      fixWidth: true,
      position: 'left',
    },
    {
      name: 'Trạng thái thông báo',
      default: true,
      value: 'statusThongBao',
      width: 500,
      fixWidth: true,
      position: 'left',
    },
  ];

  onPageSizeChange(newPageSize: number) {
    
  }

  onPageIndexChange(newPageIndex: number) {
   
  }
  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }
  
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}
const listOptionChoose: OptionSelect[] = [
  {
    label: "Hôm nay",
    value: 'today'
  },
  {
    label: "7 ngày trước",
    value: '7daylater'
  },
  {
    label: "14 ngày trước",
    value: '14daylater'
  }
]
const dataMock =[
  {
    "id": 1,
    "title": "Cập nhật: Phiên bản mới đã ra mắt",
    "content": "Phiên bản 2.0 có thêm nhiều tính năng và cải tiến hiệu suất.",
    "time": "10 phút trước",
    "status": "unread"
  },
  {
    "id": 2,
    "title": "Khuyến mãi: Giảm giá 50% cho đơn hàng đầu tiên",
    "content": "Chương trình áp dụng từ ngày 22/11 đến 30/11. Đừng bỏ lỡ!",
    "time": "1 giờ trước",
    "status": "read"
  },
  {
    "id": 3,
    "title": "Thông báo: Bảo trì hệ thống",
    "content": "Hệ thống sẽ bảo trì vào lúc 3h sáng ngày 25/11.",
    "time": "2 giờ trước",
    "status": "unread"
  },
  {
    "id": 4,
    "title": "Chào mừng bạn đến với hệ thống",
    "content": "Hãy khám phá các tính năng tuyệt vời của chúng tôi!",
    "time": "Hôm qua",
    "status": "read"
  },
  {
    "id": 5,
    "title": "Cập nhật: Thêm tính năng theo dõi đơn hàng",
    "content": "Bây giờ bạn có thể theo dõi trạng thái đơn hàng của mình theo thời gian thực.",
    "time": "Hôm qua",
    "status": "unread"
  },
  {
    "id": 6,
    "title": "Thông báo: Đăng nhập thành công",
    "content": "Bạn đã đăng nhập thành công vào hệ thống. Chúc bạn một ngày tốt lành!",
    "time": "2 ngày trước",
    "status": "read"
  },
  {
    "id": 7,
    "title": "Lời nhắc: Hoàn thành hồ sơ của bạn",
    "content": "Vui lòng hoàn thành hồ sơ để nhận được nhiều ưu đãi hơn.",
    "time": "3 ngày trước",
    "status": "unread"
  },
  {
    "id": 8,
    "title": "Khuyến mãi: Miễn phí vận chuyển",
    "content": "Áp dụng cho đơn hàng trên 500k từ ngày 20/11 đến 30/11.",
    "time": "4 ngày trước",
    "status": "read"
  },
  {
    "id": 9,
    "title": "Cập nhật: Hỗ trợ thêm phương thức thanh toán",
    "content": "Giờ đây bạn có thể thanh toán qua ví điện tử Momo và ZaloPay.",
    "time": "1 tuần trước",
    "status": "unread"
  },
  {
    "id": 10,
    "title": "Thông báo: Cảm ơn bạn đã sử dụng dịch vụ",
    "content": "Chúng tôi rất trân trọng sự ủng hộ của bạn.",
    "time": "2 tuần trước",
    "status": "read"
  }
]

