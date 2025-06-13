import { Component, OnInit } from '@angular/core';
import {ProcesoElectoral} from "../../interface/procesoElectoral.interface";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ProcesoElectoralService} from "../../service/proceso-electoral.service";



@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  procesoElectorales: ProcesoElectoral[]= [];
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  procesoElectoral!: ProcesoElectoral;
  proccesoESelected!: ProcesoElectoral;

  constructor(private procesoService: ProcesoElectoralService,
              private messageService: MessageService,private confirmationService: ConfirmationService) { }


  getAll(){
    this.procesoService.getAll().subscribe(
      (result:any)=>{
        let procesoElectorales:ProcesoElectoral[]=[];
        for( let i = 0 ; i< result.content.length; i++){
          let procesoElectoral = result.content[i] as ProcesoElectoral;
          procesoElectorales.push(procesoElectoral);
        }
        this.procesoElectorales = procesoElectorales;
      },
      error  => {console.error();}

    )
  }

  showSaveDialog(editar: boolean){
    if(editar){
      if(this.proccesoESelected.id != null){
        this.procesoElectoral = this.proccesoESelected;
      }else{
        this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
        return;
      }

    }else{
      this.procesoElectoral = {};
    }
    this.displaySaveDialog = true;
  }
  //
  ngOnInit() {
    this.procesoElectoral = {};
    this.proccesoESelected={};
    this.getAll();
    this.cols =[
      {field:"id", header:"ID"},
      {field:"nombreProceso", header:"Nombre"},
      {field:"estado", header:"Estado"},
      {field:"fechaIniProc", header:"Fecha Inicio"},
      {field:"fechaFinProc", header:"Fecha Fin"}
    ];
  }

  save(){
    this.procesoService.save(this.procesoElectoral).subscribe(
      (result:any)=>{
        let procesoelectoral = result as ProcesoElectoral;
        this.validarProceso(procesoelectoral);
        this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha creado el Proceso Electoral correctamente"});
        this.displaySaveDialog = false;
      },
      error => {
        console.log(Error);
      }
    );
  }

  validarProceso(proceso:ProcesoElectoral){
    let index = this.procesoElectorales.findIndex((e)=> e.id == proceso.id);

    if(index != -1 ){
      this.procesoElectorales[index]= proceso;
    }else{
      this.procesoElectorales.push(proceso);
    }
  }

  delete(){
    if(this.proccesoESelected == null || this.proccesoESelected.id == null ){
      this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desa elimnar el Proceso Electoral?",
      accept:()=>{
        this.procesoService.delete(this.proccesoESelected.id).subscribe(
          (result:any)=>{
            this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha eliminado el Proceso Electoral correctamente"});
            this.deleteObject(this.proccesoESelected.id);
          }
        )
      }
    })
  }

  deleteObject(id?:number){
    let index = this.procesoElectorales.findIndex((e)=>e.id== id);
    if(index != -1){
      this.procesoElectorales.splice(index,1);
    }
  }

  iniciarProc(proceso:ProcesoElectoral){

    if(proceso.id != null){

      proceso.estado = "EN PROCESO";
      proceso.fechaIniProc = new Date();

    }else{
      this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
      return;
    }
    this.procesoService.save(proceso).subscribe(
      (result:any)=>{
        let procesoelectoral = result as ProcesoElectoral;
        this.validarProceso(procesoelectoral);
        this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha Inicado el Proceso Electoral correctamente"});
      },
      error => {
        console.log(Error);
      }
    );
  }

  finalizarProc(proceso:ProcesoElectoral){

    if(proceso.id != null){

      proceso.estado = "CERRADO";
      proceso.fechaFinProc = new Date();

    }else{
      this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
      return;
    }
    this.procesoService.save(proceso).subscribe(
      (result:any)=>{
        let procesoelectoral = result as ProcesoElectoral;
        this.validarProceso(procesoelectoral);
        this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha fINALIZADO el Proceso Electoral correctamente"});
      },
      error => {
        console.log(Error);
      }
    );
  }

}
