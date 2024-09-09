import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/test' },
  {path: 'test', component: AnonymousComponent },
  { path: 'admin', loadChildren: () => import('./components/pages/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
