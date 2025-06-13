import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../interface/usuario.interface";
import {UsuarioService} from "../../../service/usuario.service";

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  usuarios:Usuario[];
  usuarioESelected?:Usuario;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      result=> this.usuarios = result
    );
  }

}
