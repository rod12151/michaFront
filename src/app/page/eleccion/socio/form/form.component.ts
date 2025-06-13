import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Agencia} from "../../../interface/agencia.interface";
import {Socio} from "../../../interface/socio.interface";
import {Sexo} from "../../../interface/sexo.interface";
import {Persona} from "../../../interface/persona.interface";
import {AgenciaService} from "../../../service/agencia.service";
import {PersonaService} from "../../../service/persona.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  agencias:Agencia[] =[];

  filteredAgencias: Agencia[]=[];

  @Output() onGuardar: EventEmitter<Socio> = new EventEmitter();

  @Input() socio!: Socio;

  persona!:Persona;

  sexos:Sexo []=[];
  selecttedSexo!:Sexo;



  constructor(
    private agenciaService:AgenciaService,
    private personaService:PersonaService
  ) {
    this.sexos = [
      {nombre : "Masculino" , codigo :'M'},
      {nombre : "Femenino" , codigo:"F"}
    ];

  }

  ngOnInit(): void {
    this.getAll();


    this.persona={};
    if (this.socio.id != null){
      this.personaService.getPersona(this.socio.persona!.id ).subscribe(
        (data:any)=>{
          this.persona = data;
          this.persona.fechaNacimiento = new Date(data.fechaNacimiento);
        }
      )
    }


  }

  guardar() {
    this.socio.persona = this.persona;
    this.onGuardar.emit(this.socio);

  }

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

  filterAgencia(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : Agencia[] = [];
    let query = event.query;

    for(let i = 0; i < this.agencias.length; i++) {
      let agencia :Agencia = this.agencias[i];
      if (agencia.nombreAgencia!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(agencia);
      }
    }

    this.filteredAgencias = filtered;
  }


}
