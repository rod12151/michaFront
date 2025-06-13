import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "../../layout/layout.component";
import {EleccionComponent} from "./eleccion.component";

import {AuthGuard} from "../../auth/helpers/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: EleccionComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./proceso/proceso.module').then(m => m.ProcesoModule),

      },
      {
        path: 'proceso',
        loadChildren: () => import('./proceso/proceso.module').then(m => m.ProcesoModule),

      },
      {
        path: 'agencia',
        loadChildren: () => import('./agencia/agencia.module').then(m => m.AgenciaModule),

      },
      {
        path: 'lista',
        loadChildren: () => import('./lista/lista.module').then(m => m.ListaModule),

      },
      {
        path: 'socio',
        loadChildren: () => import('./socio/socio.module').then(m => m.SocioModule),

      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleccionRoutingModule { }
