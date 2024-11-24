import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-posts',
  templateUrl: './feature-posts.component.html',
  styleUrl: './feature-posts.component.scss'
})
export class FeaturePostsComponent {
  postFeatureMock = [
    {
      thumbnail: 'assets/images/142814ae-b725-448c-ac5e-15ddffd00b9d.png',
      title: 'The things we need to check when we want to buy a house',
      time: '25 Apr 2021',
      author: {
        name: 'Dianne Russell',
        avatar: 'assets/images/users/user-1.jpg'
      }
    },
    {
      thumbnail: 'assets/images/142814ae-b725-448c-ac5e-15ddffd00b9d.png',
      title: '7 Ways to distinguish the quality of the house we want to buy',
      time: '24 Apr 2021',
      author: {
        name: 'Courtney Henry',
        avatar: 'assets/images/users/user-2.jpg'
      }
    },
    {
      thumbnail: 'assets/images/142814ae-b725-448c-ac5e-15ddffd00b9d.png',
      title: 'The best way to know the quality of the house we want to buy',
      time: '24 Apr 2021',
      author: {
        name: 'Darlene Robertson',
        avatar: 'assets/images/users/user-3.jpg'
      }
    },
    {
      thumbnail: 'assets/images/142814ae-b725-448c-ac5e-15ddffd00b9d.png',
      title: '12 Things to know before buying a house',
      time: '25 Apr 2021',
      author: {
        name: 'Cameron Williamson',
        avatar: 'assets/images/users/user-4.jpg'
      }
    },
  ]
}
