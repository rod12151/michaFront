import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';

import {ConfirmationService, MessageService} from "primeng/api";
import {ListaService} from "../../service/lista.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {ProcesoElectoralService} from "../../service/proceso-electoral.service";
import {AssetService} from "../../service/asset.service";
import { CandidatoComponent } from './candidato/candidato.component';
import {CandidatoService} from "../../service/candidato.service";
import {SocioService} from "../../service/socio.service";
import {CheckboxModule} from "primeng/checkbox";
import { PropuestaComponent } from './propuesta/propuesta.component';
import { PropuestaServiceService } from '../../service/propuesta-service.service';


@NgModule({
  declarations: [
    ListaComponent,
    CandidatoComponent,
    PropuestaComponent
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    DialogModule,
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    FileUploadModule,
    CheckboxModule
  ],
  providers:[
    ListaService,
    MessageService,
    ConfirmationService,
    ProcesoElectoralService,
    CandidatoService,
    SocioService,
    AssetService,
    PropuestaServiceService
  ]
})
export class ListaModule { }
