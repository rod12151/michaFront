import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SocioComponent} from "../socio/socio.component";
import {CrearComponent} from "./crear/crear.component";
import {ListarUsuarioComponent} from "./listar-usuario/listar-usuario.component";

const routes: Routes = [
  {
    path: 'crear',
    component: CrearComponent,
  },
  {
    path: 'listar',
    component: ListarUsuarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
