import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full',
  },
  {
    path: 'browse',
    loadComponent: () =>  import('./list-v2.component').then(m => m.ListV2Component)
  },
  {
    path: ':title',
    loadComponent: () =>  import('./../more-info/more-info.component').then(m => m.MoreInfoComponent)
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ListV2Module { }
