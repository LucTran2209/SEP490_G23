import { Component, Input, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  isVisible : boolean = false;
  title: string = '';

  ngOnInit() {
    this.title = 'Chỉnh sửa thông tin của Nguyễn Văn A';
  }
  showEditProfile(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }

}
