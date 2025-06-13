import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciaRoutingModule } from './agencia-routing.module';
import { AgenciaComponent } from './agencia.component';

import {ConfirmationService, MessageService} from "primeng/api";
import {AgenciaService} from "../../service/agencia.service";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AgenciaComponent
  ],
  imports: [
    CommonModule,
    AgenciaRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule,
    PanelModule,
    ToolbarModule,
    TableModule,
    RippleModule,
    DialogModule,
    FormsModule,
    InputTextModule
  ],
  providers:[
    AgenciaService,
    MessageService,
    ConfirmationService
  ]
})
export class AgenciaModule { }
