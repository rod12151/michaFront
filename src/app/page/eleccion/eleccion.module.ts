import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleccionRoutingModule } from './eleccion-routing.module';
import { EleccionComponent } from './eleccion.component';
import {AuthService} from "../../auth/services/auth.service";

import {AuthInterceptor} from "../../auth/helpers/auth.interceptor";

import {AuthGuard} from "../../auth/helpers/auth.guard";


@NgModule({
  declarations: [
    EleccionComponent
  ],
  imports: [
    CommonModule,
    EleccionRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthInterceptor
  ],
})
export class EleccionModule { }
