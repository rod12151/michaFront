import { Component, OnInit } from '@angular/core';
import {Socio} from "../../../interface/socio.interface";
import {SocioService} from "../../../service/socio.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  socio!:Socio;
  constructor(
    private socioService:SocioService,
    private router:Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.socio={};
  }

  crear(socio:Socio){
    this.socioService.save(socio)
      .subscribe(data => {
          this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha creado la Agencia  correctamente"});
          this.router.navigate(['/eleccion/socio'])},
        error => {
          console.log(Error);
        }
      )
  }

}
