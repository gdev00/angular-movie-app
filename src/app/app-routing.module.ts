import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
