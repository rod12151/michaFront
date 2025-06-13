import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../interface/usuario.interface";
import {SocioService} from "../../../service/socio.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UsuarioService} from "../../../service/usuario.service";
import {Socio} from "../../../interface/socio.interface";

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  usuario!:Usuario
  constructor( private usuarioService:UsuarioService,
               private router:Router,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.usuario = {};

  }

  crear(usuario:Usuario){
    this.usuarioService.crear(usuario)
      .subscribe(data => {
          this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha creado el Usuario  correctamente"});
          this.router.navigate(['/usuario/listar'])},
        error => {
          console.log(Error);
        }
      )
  }
}
