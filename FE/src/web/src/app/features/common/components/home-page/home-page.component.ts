import { Component, inject, OnInit } from '@angular/core';
import { CategoryOutputDto } from '../../../../interfaces/category.interface';
import { FeedbackOutputDto } from '../../../../interfaces/feedback.interface';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';
import { PostService } from '../../../../services/post.service';
import { map } from 'rxjs';
import { TypewriterService } from '../../../../services/typewriter.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  backgroundImageUrl: string = 'assets/images/header-home.png';
  categoryListTop = mockCategories;
  feedbackDataList = feedbackData;
  items = [1, 2, 3, 4, 5];
  titles = ['Thuê các thiết bị chỉ bằng vài cú nhấp chuột'];
  private typewriterService = inject(TypewriterService);
  typedText$ = this.typewriterService
    .getTypewriterEffect(this.titles)
    .pipe(map((text) => text));
  postList: PostOutputDto[] = [];

  loadPosts(){
    this.postService.listPost().subscribe((res: PostResultService) =>{
      this.postList = res.datas.list;
    });
  }


  ngOnInit(): void{
    this.loadPosts();
  }

  constructor(private postService: PostService) {}
  
}


//mockdata
const mockCategories: CategoryOutputDto[] = [
  {
    id: '1',
    categoryName: 'Thiết bị xây dựng',
    subCategories: [
      { id: '1-1', subCategoryName: 'Máy xúc' },
      { id: '1-2', subCategoryName: 'Cần cẩu' },
    ],
  },
  {
    id: '2',
    categoryName: 'Dụng cụ công nghiệp',
    subCategories: [
      { id: '2-1', subCategoryName: 'Máy khoan' },
      { id: '2-2', subCategoryName: 'Máy hàn' },
    ],
  },
  {
    id: '3',
    categoryName: 'Thiết bị văn phòng',
    subCategories: [
      { id: '3-1', subCategoryName: 'Máy in' },
      { id: '3-2', subCategoryName: 'Máy scan' },
    ],
  },
  {
    id: '4',
    categoryName: 'Thiết bị CNTT',
    subCategories: [
      { id: '4-1', subCategoryName: 'Máy chủ' },
      { id: '4-2', subCategoryName: 'Switch mạng' },
    ],
  },
  {
    id: '5',
    categoryName: 'Đồ gia dụng',
    subCategories: [
      { id: '5-1', subCategoryName: 'Máy giặt' },
      { id: '5-2', subCategoryName: 'Tủ lạnh' },
    ],
  },
  {
    id: '6',
    categoryName: 'Thiết bị âm thanh',
    subCategories: [
      { id: '6-1', subCategoryName: 'Máy chiếu' },
      { id: '6-2', subCategoryName: 'Hệ thống loa' },
    ],
  },
  {
    id: '7',
    categoryName: 'Dụng cụ thể thao',
    subCategories: [
      { id: '7-1', subCategoryName: 'Máy chạy bộ' },
      { id: '7-2', subCategoryName: 'Xe đạp tập' },
    ],
  },
  {
    id: '8',
    categoryName: 'Thiết bị nhiếp ảnh',
    subCategories: [
      { id: '8-1', subCategoryName: 'Máy ảnh' },
      { id: '8-2', subCategoryName: 'Chân máy' },
    ],
  },
  {
    id: '9',
    categoryName: 'Thiết bị y tế',
    subCategories: [
      { id: '9-1', subCategoryName: 'Máy đo huyết áp' },
      { id: '9-2', subCategoryName: 'Máy tạo oxy' },
    ],
  },
  {
    id: '10',
    categoryName: 'Phương tiện vận chuyển',
    subCategories: [
      { id: '10-1', subCategoryName: 'Xe nâng' },
      { id: '10-2', subCategoryName: 'Xe điện' },
    ],
  },
];

const feedbackData: FeedbackOutputDto[] = [
  { id: "1" ,productId: "SP001", userName: "Nguyen Van A", rating: 5, comment: "Sản phẩm rất tốt, tôi hài lòng." },
  { id: "1" ,productId: "SP002", userName: "Le Thi B", rating: 4, comment: "Sản phẩm khá ổn, giao hàng nhanh." },
  { id: "1" ,productId: "SP003", userName: "Tran Van C", rating: 3, comment: "Chất lượng bình thường, giá cả hợp lý." },
  { id: "1" ,productId: "SP004", userName: "Pham Thi D", rating: 5, comment: "Rất đáng tiền, sẽ mua lại." },
  { id: "1" ,productId: "SP005", userName: "Hoang Van E", rating: 2, comment: "Không hài lòng với sản phẩm." },
  { id: "1" ,productId: "SP006", userName: "Vu Thi F", rating: 4, comment: "Dịch vụ tốt, sản phẩm ổn." },
  { id: "1" ,productId: "SP007", userName: "Do Van G", rating: 3, comment: "Sản phẩm dùng tạm được." },
  { id: "1" ,productId: "SP008", userName: "Nguyen Thi H", rating: 5, comment: "Hài lòng, sản phẩm rất đẹp." },
  { id: "1" ,productId: "SP009", userName: "Pham Van I", rating: 1, comment: "Chất lượng kém, không đáng tiền." },
  { id: "1" ,productId: "SP010", userName: "Tran Thi J", rating: 3, comment: "Ổn, nhưng chưa thực sự tốt." },
  { id: "1" ,productId: "SP011", userName: "Nguyen Van K", rating: 4, comment: "Giao hàng nhanh, sản phẩm tốt." },
  { id: "1" ,productId: "SP012", userName: "Le Thi L", rating: 2, comment: "Không như mong đợi." },
  { id: "1" ,productId: "SP013", userName: "Pham Van M", rating: 5, comment: "Sản phẩm rất đẹp và chất lượng." },
  { id: "1" ,productId: "SP014", userName: "Tran Thi N", rating: 3, comment: "Chất lượng tạm ổn." },
  { id: "1" ,productId: "SP015", userName: "Nguyen Van O", rating: 4, comment: "Tôi sẽ giới thiệu sản phẩm này cho bạn bè." },
  { id: "1" ,productId: "SP016", userName: "Le Thi P", rating: 1, comment: "Rất thất vọng về sản phẩm." },
  { id: "1" ,productId: "SP017", userName: "Tran Van Q", rating: 5, comment: "Tuyệt vời, không có điểm nào để chê." },
  { id: "1" ,productId: "SP018", userName: "Hoang Thi R", rating: 4, comment: "Sản phẩm tốt, giá cả hợp lý." },
  { id: "1" ,productId: "SP019", userName: "Pham Van S", rating: 2, comment: "Không như mong đợi, sản phẩm kém." },
  { id: "1" ,productId: "SP020", userName: "Nguyen Thi T", rating: 3, comment: "Dùng tạm được, không quá xuất sắc." },
];
