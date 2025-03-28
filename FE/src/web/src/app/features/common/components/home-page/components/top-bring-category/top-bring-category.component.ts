import { Component } from '@angular/core';
import { BaseComponentsComponent } from '../../../../../../components/base-components/base-components.component';

@Component({
  selector: 'app-top-bring-category',
  templateUrl: './top-bring-category.component.html',
  styleUrl: './top-bring-category.component.scss'
})
export class TopBringCategoryComponent extends BaseComponentsComponent{
 listCategoryHot = [
  {
    title: 'Đồ gia dụng',
    icon: '🏠'
  },
  {
    title: 'Thiết bị công nghệ',
    icon: '🎥'
  },
  {
    title: 'Thiết bị xây dựng',
    icon: '🏗️'
  },
  {
    title: 'Dụng cụ tổ chức sự kiện',
    icon: '🎉'
  },
  {
    title: ' Đồ dùng học tập',
    icon: '📚'
  },
  {
    title: 'Thiết bị thể thao và dã ngoại',
    icon: '🚴'
  },
  {
    title: ' Đồ dùng học tập',
    icon: '📚'
  },
  {
    title: 'Thiết bị thể thao và dã ngoại',
    icon: '🚴'
  },
  {
    title: ' Đồ dùng học tập',
    icon: '📚'
  },
  {
    title: 'Thiết bị thể thao và dã ngoại',
    icon: '🚴'
  },
 ]
}
