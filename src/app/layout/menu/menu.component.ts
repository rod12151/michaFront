import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
// import {Router} from "@angular/router";
// import {FilterService} from "primeng/api";
// import {DomHandler} from "primeng/dom";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // selectedRoute: any;

  // submenuRouting: boolean = true;

  @Input() active: boolean = false;
  filteredRoutes: any[] = [];
  scrollable = true;
  role : string;
  // activeSubmenus: {[key: string]: boolean} = {};

  constructor(
  ) { }

  ngOnInit(): void {
     this.role=localStorage.getItem("role")
  }

  // onSelect(event:any) {
  //   if (this.router.url !== event.value) {
  //     this.scrollable = true;
  //     this.router.navigate([event.value]);
  //   }
  //
  //   this.selectedRoute = null;
  // }



}
