import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Socio} from "../../../interface/socio.interface";
import {Usuario} from "../../../interface/usuario.interface";

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  opcion:any[];

  @Output() onGuardar: EventEmitter<Usuario> = new EventEmitter();

  @Input() usuario!: Usuario;

  constructor() {
    this.opcion = [
      {name: 'Administrador', code: 'ADMIN'},
      {name: 'Lector', code: 'LECTOR'},
    ];
  }

  ngOnInit(): void {
  }

  guardar() {
    // this.usuario.persona = this.persona;
    this.onGuardar.emit(this.usuario);

  }

}
