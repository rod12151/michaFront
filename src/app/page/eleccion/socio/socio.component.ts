import { Component, OnInit } from '@angular/core';
import {Socio} from "../../interface/socio.interface";
import {SocioService} from "../../service/socio.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.scss']
})
export class SocioComponent implements OnInit {

  socios : Socio []=[];
  constructor(private socioService: SocioService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.socioService.getAll().subscribe(
      (result:any)=>{
        let socios:Socio[]=[];

        for( let i = 0 ; i< result.content.length; i++){
          let socio = result.content[i] as Socio;
          socios.push(socio);
        }
        this.socios = socios;
      },
      error  => {console.error();}

    )
  }

  editarSocio(socio: Socio) {
    this.router.navigate(['eleccion/socio/editar', socio.id]);
  }

  eliminarSocio(socio:Socio){
    this.confirmationService.confirm({
      message: "¿Esta seguro que desa elimnar un socio ?",
      accept:()=>{
        this.socioService.delete(socio.id).subscribe(
          (result:any)=>{
            this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha eliminado el socio correctamente"});
            this.deleteObject(socio.id);
          }
        )
      }
    })
  }

  deleteObject(id?:number){
    let index = this.socios.findIndex((e)=>e.id== id);
    if(index != -1){
      this.socios.splice(index,1);
    }
  }
}
