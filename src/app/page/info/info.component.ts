import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Lista } from '../interface/lista.interface';
import { Candidato } from '../interface/candidato.interface';
import { Propuesta } from '../interface/propuesta.interface';
import { ProcesoElectoral } from '../interface/procesoElectoral.interface';
import { PublicServiceService } from '../service/public-service.service';
import { PropuestaServiceService } from '../service/propuesta-service.service';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';



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
    private propuestaService:PropuestaServiceService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    
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
    setInterval(() => {
    this.moveSlide(1);
  }, 3000);
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
  if (!fecha) return 'Proceso no iniciado';

  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
//carrosel
@ViewChild('slider', { static: false }) slider!: ElementRef<HTMLDivElement>;
  currentIndex: number = 0;

  moveSlide(direction: number): void {
  const sliderElement = this.slider.nativeElement;
  const slideWidth = sliderElement.clientWidth;
  const totalSlides = sliderElement.children.length;

  this.currentIndex += direction;

  // Carrusel circular
  if (this.currentIndex < 0) {
    this.currentIndex = totalSlides - 1;
  } else if (this.currentIndex >= totalSlides) {
    this.currentIndex = 0;
  }

  sliderElement.scrollTo({
    left: slideWidth * this.currentIndex,
    behavior: 'smooth'
  });
}

//navegacion
scrollToIfReady(id: string) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // puedes probar con 100 ms si 0 no funciona
}

}
