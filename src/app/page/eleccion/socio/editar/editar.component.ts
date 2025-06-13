import { Component, OnInit } from '@angular/core';
import {Socio} from "../../../interface/socio.interface";
import {SocioService} from "../../../service/socio.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  socio!:Socio;
  constructor(private socioService:SocioService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.socioService.getSocio(id).subscribe(
      (data:any)=>{

        this.socio = data;
        this.socio.fechaIngreso= new Date(data.fechaIngreso);
      }
    )
  }

  actualizar(socio: Socio) {
    this.socioService.save( socio)
      .subscribe(data => this.router.navigate(['/eleccion/socio']));
  }
}
