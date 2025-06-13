import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjemploComponent } from './ejemplo.component';
import {EjemploRoutingModule} from "./ejemplo-routing.module";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputNumberModule} from "primeng/inputnumber";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {RatingModule} from "primeng/rating";
import {ProductService} from "./productService";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientModule} from "@angular/common/http";




@NgModule({
  declarations: [
    EjemploComponent
  ],
  imports: [
    CommonModule,
    EjemploRoutingModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    RippleModule,
    FormsModule,
    InputTextModule,
    RatingModule,
    HttpClientModule // importante si hay peticion
  ],
  providers: [ProductService, MessageService, ConfirmationService]
})
export class EjemploModule { }
