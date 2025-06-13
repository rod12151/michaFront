import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu/menu.component";
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';
import {RouterModule} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";
import {LayoutRoutingModule} from "./layout-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../auth/helpers/auth.interceptor";
import {ErrorInterceptor} from "../auth/helpers/error.interceptor";
import {AuthService} from "../auth/services/auth.service";

import {AuthGuard} from "../auth/helpers/auth.guard";
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    TopbarComponent,
    LayoutComponent
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    LayoutRoutingModule,
    HttpClientModule,
    MenubarModule,
    SharedModule,
    InputTextModule,

  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthInterceptor,

  ],
})
export class LayoutModule { }
