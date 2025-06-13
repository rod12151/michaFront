import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListaComponent} from "./lista.component";
import {CandidatoComponent} from "./candidato/candidato.component";

const routes: Routes = [
  {
    path: '',
    component: ListaComponent,
  },
  {
    path:'candidato/:id',
    component:CandidatoComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
