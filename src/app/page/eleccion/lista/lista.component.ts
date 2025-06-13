// @ts-ignore
// @ts-ignore

import {Component, OnInit, ViewChild} from '@angular/core';
import {Lista} from "../../interface/lista.interface";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ProcesoElectoral} from "../../interface/procesoElectoral.interface";
import {ListaService} from "../../service/lista.service";
import {ProcesoElectoralService} from "../../service/proceso-electoral.service";
import {AssetService} from "../../service/asset.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileUpload} from "primeng/fileupload";


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;
  uplo!: File ;
  urlPortada?: string;
  previsualizacion!:string;
  public archivos:any =[];
  vfalse: boolean = false;
  listas: Lista[]=[];
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  lista!: Lista;
  listaESelected!: Lista;

  procesosElectorales:ProcesoElectoral[]=[];
  filteredProceso: ProcesoElectoral[]=[];

  constructor(private listaService: ListaService,private messageService: MessageService,private confirmationService: ConfirmationService,
              private procesoElectoralService: ProcesoElectoralService,
              private assetService:AssetService,
              private sanitizer: DomSanitizer) { }

  getAll(){
    this.listaService.getAll().subscribe(
      (result:any)=>{
        let listas:Lista[]=[];
        for( let i = 0 ; i< result.length; i++){
          let lista = result[i] as Lista;
          listas.push(lista);
        }
        this.listas = listas;
      },
      error  => {console.error();}

    )
  }

  showSaveDialog(editar: boolean){
    if(editar){
      if(this.listaESelected.id != null){
        this.lista = this.listaESelected;
      }else{
        this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
        return;
      }

    }else{
      this.lista = {};
    }
    this.displaySaveDialog = true;
  }

  ngOnInit() {
    this.lista = {};
    this.vfalse = false;
    this.getAllProcesos();
    this.listaESelected={};
    this.getAll();
    this.cols =[
      {field:"id", header:"ID"},
      {field:"nombre", header:"Nombre"}
    ];
  }



  save(){

    this.lista.rutaArchivo=this.urlPortada;
    this.listaService.save(this.lista).subscribe(
      (result:any)=>{
        let lista = result as Lista;
        this.validarProceso(lista);
        this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha creado la Lista  correctamente"});
        this.displaySaveDialog = false;
      },
      error => {
        console.log(Error);
      }
    );

    this.fileInput.clear();
    this.archivos.pull;
    this.previsualizacion='';
  }

  validarProceso(lista:Lista){
    let index = this.listas.findIndex((e)=> e.id == lista.id);

    if(index != -1 ){
      this.listas[index]= lista;
    }else{
      this.listas.push(lista);
    }
  }

  delete(){
    if(this.listaESelected == null || this.listaESelected.id == null ){
      this.messageService.add({severity: 'warn',summary:"Advertencia!",detail:"Debe de seleccionar un registro"});
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desa elimnar la Lista ?",
      accept:()=>{
        this.listaService.delete(this.listaESelected.id).subscribe(
          (result:any)=>{
            this.messageService.add({severity: 'success',summary:"Resultado",detail:"Se ha eliminado la Lista correctamente"});
            this.deleteObject(this.listaESelected.id);
          }
        )
      }
    })
  }

  deleteObject(id?:number){
    let index = this.listas.findIndex((e)=>e.id== id);
    if(index != -1){
      this.listas.splice(index,1);
    }
  }



  getAllProcesos(){
    this.procesoElectoralService.getAll().subscribe(
      (result:any)=>{
        let procesoElectoral2:ProcesoElectoral[]=[];
        for( let i = 0 ; i< result.content.length; i++){
          let procesoElectoral = result.content[i] as ProcesoElectoral;
          procesoElectoral2.push(procesoElectoral);
        }
        this.procesosElectorales = procesoElectoral2;
      },
      error  => {console.error();}
    )
  }

  filterProceso(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : ProcesoElectoral[] = [];
    let query = event.query;

    for(let i = 0; i < this.procesosElectorales.length; i++) {
      let proceso :ProcesoElectoral = this.procesosElectorales[i];
      if (proceso.nombreProceso!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(proceso);
      }
    }

    this.filteredProceso = filtered;
  }

  onUpload(event:any) {
    for(let file of event.files) {
      this.archivos.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }




  onFileChange(event:any){

    const archivoCapturado = this.uplo = event.currentFiles[0];
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(archivoCapturado);

//  this.uplo = event.currentFiles;
    if (this.archivos[0]) {
      const formData = new FormData();

      formData.append('file', this.archivos[0]);

      this.assetService.subirArchivo(formData)
        .subscribe((asset: any) => {

          this.urlPortada = asset.url;


        })

    }

  }



  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}
