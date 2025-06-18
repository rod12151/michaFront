import { Component, OnInit } from '@angular/core';
import { Lista } from '../interface/lista.interface';
import { Candidato } from '../interface/candidato.interface';
import { Propuesta } from '../interface/propuesta.interface';
import { ProcesoElectoral } from '../interface/procesoElectoral.interface';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
procesos: ProcesoElectoral[] = [];
  listas: Lista[] = [];
  candidatos: Candidato[] = [];
  propuestas: Propuesta[] = [];

  procesoSeleccionado: any = null;
  listaSeleccionada: any = null;

  constructor() { }

  ngOnInit(): void {
    this.cargarProcesos();
  }

  cargarProcesos(): void {
    // Aquí debes llamar a tu servicio para obtener los procesos
  }

  seleccionarProceso(proceso: any): void {
    this.procesoSeleccionado = proceso;
    this.cargarListasPorProceso(proceso.id);
  }

  cargarListasPorProceso(idProceso: number): void {
    // Llamar servicio que devuelve listas por id de proceso
  }

  seleccionarLista(lista: any): void {
    this.listaSeleccionada = lista;
    this.cargarCandidatosPorLista(lista.id);
    this.cargarPropuestasPorLista(lista.id);
  }

  cargarCandidatosPorLista(idLista: number): void {
    // Llamar servicio para obtener candidatos de esa lista
  }

  cargarPropuestasPorLista(idLista: number): void {
    // Llamar servicio para obtener propuestas de esa lista
  }

}
