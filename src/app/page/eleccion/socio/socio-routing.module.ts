import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SocioComponent} from "./socio.component";
import {NuevoComponent} from "./nuevo/nuevo.component";
import {EditarComponent} from "./editar/editar.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  {
    path: '',
    component: SocioComponent,
  },
  {
    path: 'nuevo',
    component: NuevoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocioRoutingModule { }
