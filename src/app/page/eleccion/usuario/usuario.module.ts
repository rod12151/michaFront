import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import {HttpClientModule} from "@angular/common/http";
import {SocioService} from "../../service/socio.service";
import {UsuarioService} from "../../service/usuario.service";
import {EleccionModule} from "../eleccion.module";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {PasswordModule} from "primeng/password";


@NgModule({
  declarations: [
    CrearComponent,
    ListarUsuarioComponent,
    FormUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    ToolbarModule,
    TableModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    PasswordModule

  ],
  providers:[
    UsuarioService,
    MessageService,
    ConfirmationService
  ]
})
export class UsuarioModule { }
