import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () => import('./pages/inmueble-nuevo/inmueble-nuevo.module').then(m => m.InmuebleNuevoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/inmueble-list/inmueble-list.module').then(m => m.InmuebleListModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
