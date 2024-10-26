import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  @Input() infoRenter: any = {
    name: 'Ngô Hữu Nam',
    phone: '0327033756',
    email: 'ngohuunam2002@gmail.com',
    address: 'Trang hạ, từ sơn, bắc ninh',
    note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed a vero animi neque similique atque magni deserunt autem. Ipsum, natus?',
  };
}
