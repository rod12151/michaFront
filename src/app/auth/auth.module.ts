import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {HttpClientModule} from "@angular/common/http";

import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "./services/auth.service";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {AuthGuard} from "./helpers/auth.guard";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        HttpClientModule,
        ButtonModule,
        CardModule,
        ToastModule,

    ],
  providers:[
    AuthService,
    MessageService,
    ConfirmationService,
    AuthGuard,
    AuthInterceptor
  ]
})
export class AuthModule { }
