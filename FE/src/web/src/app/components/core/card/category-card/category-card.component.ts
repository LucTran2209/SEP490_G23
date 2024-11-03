import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryOutputDto } from '../../../../interfaces/category.interface';
import { generateRandomColor } from '../../../../utils/anonymous.helper';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
@Input() categoriesItem?: CategoryOutputDto;
randomColor: string = generateRandomColor();
firstWord(){
  return this.categoriesItem?.categoryName.charAt(0);
}

onNavigate(){
  this.router.navigate([`/common/category?categoryName=${this.categoriesItem?.categoryName}&cid=${this.categoriesItem?.id}`]); 
}

constructor(private router: Router) {
  
}
}


