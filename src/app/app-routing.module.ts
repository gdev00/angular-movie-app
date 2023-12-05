import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './movie/feature/root/root.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./movie/feature/root/root.component').then(m => m.RootComponent),
  },
  {
    path: 'v1-movie',
    loadChildren: () => import('./movie/feature/list-v1/list-v1.module').then(m => m.ListV1Module),
  },
  {
    path: 'v2-movie',
    loadChildren: () => import('./movie/feature/list-v2/list-v2.module').then(m => m.ListV2Module),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
