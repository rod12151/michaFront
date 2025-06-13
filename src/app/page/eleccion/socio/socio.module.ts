import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocioRoutingModule } from './socio-routing.module';
import { SocioComponent } from './socio.component';
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";

import {ConfirmationService, MessageService} from "primeng/api";
import {SocioService} from "../../service/socio.service";
import {HttpClientModule} from "@angular/common/http";
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditarComponent } from './editar/editar.component';
import { FormComponent } from './form/form.component';
import {AgenciaService} from "../../service/agencia.service";
import {PersonaService} from "../../service/persona.service";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    SocioComponent,
    NuevoComponent,
    EditarComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SocioRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    ToolbarModule,
    TableModule,
    RippleModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    AutoCompleteModule,
    InputMaskModule,
    DropdownModule
  ],
  providers:[
    SocioService,
    AgenciaService,
    PersonaService,
    MessageService,
    ConfirmationService
  ]
})
export class SocioModule { }
