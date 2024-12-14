import { Component } from '@angular/core';

interface Feedback {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-feedback-about-we',
  templateUrl: './feedback-about-we.component.html',
  styleUrl: './feedback-about-we.component.scss',
})
export class FeedbackAboutWeComponent {
  feedbacks = feedbacks;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: false,
  };

  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }

  mockFeedBack = Array(5).fill(null);

  generateImage(id: number | string) {
    const imageRoot = 'assets/images/users/'; //user-1.jpg
    let numberId = Number(id);
    const divideSix =
      numberId >= 6 ? Math.floor(Number(id) / 6) : Math.floor(6 / Number(id));
    return `${imageRoot}user-${divideSix}.jpg`;
  }
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    date: '2 ngày trước',
    rating: 5,
    comment: 'Cảm ơn rất nhiều! Tôi thực sự hài lòng với dịch vụ của bạn.',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    date: '3 ngày trước',
    rating: 5,
    comment: 'Giao hàng nhanh chóng, trải nghiệm rất mượt mà và dễ chịu.',
  },
  {
    id: 3,
    name: 'Lê Minh C',
    date: '1 tuần trước',
    rating: 5,
    comment:
      'Mọi người ơi, nếu cần thuê thiết bị, hãy chọn ERMS. Dịch vụ 5 sao!',
  },
  {
    id: 4,
    name: 'Phạm Ngọc D',
    date: '2 tuần trước',
    rating: 5,
    comment: 'Trải nghiệm tuyệt vời, đội ngũ hỗ trợ cực kỳ nhiệt tình!',
  },
  {
    id: 5,
    name: 'Vũ Hồng E',
    date: '5 ngày trước',
    rating: 5,
    comment:
      'Phản hồi nhanh chóng, thiết bị giao đúng như quảng cáo. Rất đáng giá!',
  },
  {
    id: 6,
    name: 'Nguyễn Thanh F',
    date: '3 ngày trước',
    rating: 5,
    comment: 'Dịch vụ chuyên nghiệp, thiết bị sạch sẽ và hoạt động tốt.',
  },
  {
    id: 7,
    name: 'Đinh Mai G',
    date: '4 ngày trước',
    rating: 5,
    comment: 'Quá trình đặt thuê thiết bị rất dễ dàng, giá cả hợp lý. Cảm ơn!',
  },
  {
    id: 8,
    name: 'Hoàng Yến H',
    date: '1 tuần trước',
    rating: 5,
    comment: 'Tôi rất ấn tượng với sự hỗ trợ nhiệt tình từ đội ngũ của bạn.',
  },
  {
    id: 9,
    name: 'Phạm Anh I',
    date: '6 ngày trước',
    rating: 5,
    comment: 'Dịch vụ thật sự xuất sắc! Tôi sẽ tiếp tục sử dụng lần tới.',
  },
  {
    id: 10,
    name: 'Trần Hữu K',
    date: '2 ngày trước',
    rating: 5,
    comment: 'Thiết bị được giao đúng giờ, chất lượng vượt mong đợi!',
  },
  {
    id: 11,
    name: 'Nguyễn Thu L',
    date: '5 ngày trước',
    rating: 5,
    comment: 'Trang web dễ sử dụng, tôi đặt thuê rất nhanh chóng và tiện lợi.',
  },
  {
    id: 12,
    name: 'Hoàng Vân M',
    date: '3 ngày trước',
    rating: 5,
    comment: 'Rất hài lòng với cách làm việc chuyên nghiệp và chu đáo.',
  },
  {
    id: 13,
    name: 'Phạm Hoàng N',
    date: '4 ngày trước',
    rating: 5,
    comment: 'Đặt thuê dễ dàng, giao hàng đúng hẹn. Rất cảm kích!',
  },
  {
    id: 14,
    name: 'Lê Hữu O',
    date: '1 tuần trước',
    rating: 5,
    comment: 'Cảm ơn đội ngũ đã hỗ trợ tận tình khi tôi gặp khó khăn.',
  },
  {
    id: 15,
    name: 'Trần Mai P',
    date: '2 tuần trước',
    rating: 5,
    comment: 'Thiết bị mới và hoạt động tốt, dịch vụ rất đáng tin cậy.',
  },
  {
    id: 16,
    name: 'Nguyễn Minh Q',
    date: '5 ngày trước',
    rating: 5,
    comment: 'Dịch vụ tuyệt vời, tôi sẽ giới thiệu cho bạn bè.',
  },
  {
    id: 17,
    name: 'Phạm Thu R',
    date: '3 ngày trước',
    rating: 5,
    comment:
      'Đặt thuê lần đầu nhưng rất ấn tượng với sự nhanh chóng và chính xác.',
  },
  {
    id: 18,
    name: 'Lê Văn S',
    date: '4 ngày trước',
    rating: 5,
    comment: 'Cảm ơn vì đã giúp tôi có được thiết bị cần thiết đúng lúc.',
  },
  {
    id: 19,
    name: 'Hoàng Hương T',
    date: '2 ngày trước',
    rating: 5,
    comment: 'Dịch vụ chu đáo, thiết bị sạch sẽ và đạt chuẩn.',
  },
  {
    id: 20,
    name: 'Nguyễn Ngọc U',
    date: '6 ngày trước',
    rating: 5,
    comment: 'Tôi thực sự hài lòng, đội ngũ hỗ trợ làm việc rất hiệu quả.',
  },
];

export default feedbacks;
