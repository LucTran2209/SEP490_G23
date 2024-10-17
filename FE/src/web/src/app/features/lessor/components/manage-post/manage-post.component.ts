import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.scss'
})
export class ManagePostComponent {
  isVisible : boolean = false;
  showCreatePost(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }
}