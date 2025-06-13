import { Component, OnInit } from '@angular/core';
import {Agencia} from "../../interface/agencia.interface";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {AgenciaService} from "../../service/agencia.service";

@Component({
  selector: 'app-agencia',
  templateUrl: './agencia.component.html',
  styleUrls: ['./agencia.component.scss']
})
export class AgenciaComponent implements OnInit {
  agencias: Agencia[]=[];
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  agencia!: Agencia;
  agenciaESelected!: Agencia;

  constructor(private agenciaService: AgenciaService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  getAll(){
    this.agenciaService.getAll().subscribe(
      (result:any)=>{
        let agencias:Agencia[]=[];
        for( let i = 0 ; i< result.length; i++){
          let agencia = result[i] as Agencia;
          agencias.push(agencia);
        }
        this.agencias = agencias;
      },
      error  => {console.error();}

    )
  }

  showSaveDialog(editar: boolean){
    if(editar){
      if(this.agenciaESelected.id != null){
        this.agencia = this.agenciaESelected;
      }else{
        this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
        return;
      }

    }else{
      this.agencia = {};
    }
    this.displaySaveDialog = true;
  }

  ngOnInit() {
    this.agencia = {};
    this.agenciaESelected={};
    this.getAll();
    this.cols =[
      {field:"id", header:"ID"},
      {field:"nombreAgencia", header:"Nombre"}
    ];
  }

  save(){
    this.agenciaService.save(this.agencia).subscribe(
      (result:any)=>{
        let agencia = result as Agencia;
        this.validarProceso(agencia);
        this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha creado la Agencia  correctamente"});
        this.displaySaveDialog = false;
      },
      error => {
        console.log(Error);
      }
    );
  }

  validarProceso(agencia:Agencia){
    let index = this.agencias.findIndex((e)=> e.id == agencia.id);

    if(index != -1 ){
      this.agencias[index]= agencia;
    }else{
      this.agencias.push(agencia);
    }
  }

  delete(){
    if(this.agenciaESelected == null || this.agenciaESelected.id == null ){
      this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desa elimnar la Agencia ?",
      accept:()=>{
        this.agenciaService.delete(this.agenciaESelected.id).subscribe(
          (result:any)=>{
            this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha eliminado la Agencia correctamente"});
            this.deleteObject(this.agenciaESelected.id);
          }
        )
      }
    })
  }

  deleteObject(id?:number){
    let index = this.agencias.findIndex((e)=>e.id== id);
    if(index != -1){
      this.agencias.splice(index,1);
    }
  }

}
