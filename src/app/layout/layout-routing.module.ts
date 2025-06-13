import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../page/home/home.component";
import {LayoutComponent} from "./layout.component";

import {AuthGuard} from "../auth/helpers/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'ejemplo',
        loadChildren: () => import('./../page/home/home.module').then(m => m.HomeModule)
      },
      {
        path:'',
        loadChildren: () => import('./../page/eleccion/eleccion.module').then(m => m.EleccionModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'eleccion',
        loadChildren: () => import('./../page/eleccion/eleccion.module').then(m => m.EleccionModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
