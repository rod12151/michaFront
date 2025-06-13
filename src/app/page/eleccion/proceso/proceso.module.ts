import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { ProcesoComponent } from './proceso.component';
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProcesoElectoralService} from "../../service/proceso-electoral.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    ProcesoComponent
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    RippleModule
  ],
  providers:[
    ProcesoElectoralService,
    MessageService,
    ConfirmationService
  ]
})
export class ProcesoModule { }
