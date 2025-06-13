import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();
  // @ViewChild('topbarMenu') topbarMenu: ElementRef ;


  visible:boolean = false;
  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick.emit();
    event.preventDefault();
  }

  logout():void{
    this.authService.logout();
    console.log("Salir")
    this.router.navigate(['/login'])
  }



  showOption() {
    this.visible = ! this.visible;
  }
}
