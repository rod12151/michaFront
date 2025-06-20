import { Component, OnInit } from '@angular/core';
import { Lista } from '../interface/lista.interface';
import { Candidato } from '../interface/candidato.interface';
import { Propuesta } from '../interface/propuesta.interface';
import { ProcesoElectoral } from '../interface/procesoElectoral.interface';
import { PublicServiceService } from '../service/public-service.service';
import { PropuestaServiceService } from '../service/propuesta-service.service';



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
  listaSeleccionada: Lista = null;

  constructor( 
    private publicService:PublicServiceService,
    private propuestaService:PropuestaServiceService
    
  ) { }
  images:string[] =[];

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

  ngOnInit(): void {
    this.cargarProcesos();
  }

  cargarProcesos(): void {
    this.publicService.listaProcesos().subscribe({
      next:(response)=>{
        this.procesos=response;
        console.log(response)
        

      },
      error:(error)=>{
        console.error(error)
      }
    })
    // Aquí debes llamar a tu servicio para obtener los procesos
  }

  seleccionarProceso(proceso: ProcesoElectoral){
    this.procesoSeleccionado = proceso;
    console.log("la fecha");
    console.log(proceso.fechaIniProc)
    this.cargarListasPorIdProceso(proceso.id);
    this.listaSeleccionada = null;
  }

  cargarListasPorIdProceso(idProceso: number){
    this.publicService.ListaPorIdProceso(idProceso).subscribe({
      next:(response)=>{
        this.listas=response;
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
    // Llamar servicio que devuelve listas por id de proceso
  }

  seleccionarLista(lista: Lista){
    this.listaSeleccionada = lista;
    this.candidatos=lista.candidatos;
    this.listaPropuestas(lista.id)
    
  }

  listaPropuestas(idLista:number){
    this.propuestaService.getByListaId(idLista).subscribe({
      next:(response)=>{
        this.propuestas=response;
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  
  formatearFecha(fecha: Date | string): string {
  if (!fecha) return 'Sin fecha';

  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

}
