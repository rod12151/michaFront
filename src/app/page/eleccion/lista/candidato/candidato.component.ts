import { Component, Input, OnInit } from '@angular/core';
import { Lista } from "../../../interface/lista.interface";
import { CandidatoService } from "../../../service/candidato.service";
import { Candidato } from "../../../interface/candidato.interface";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ProcesoElectoral } from "../../../interface/procesoElectoral.interface";
import { SocioService } from "../../../service/socio.service";
import { Socio } from "../../../interface/socio.interface";
import { ListaService } from "../../../service/lista.service";

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.scss']
})
export class CandidatoComponent implements OnInit {

  lista!: Lista;
  candidatoESelected!: Candidato;
  candidatos: Candidato[] = [];
  cols: any[] = [];

  candidato!: Candidato;
  displaySaveDialog: boolean = false;

  socios: Socio[] = [];
  filteredSocios: Socio[] = [];

  checked: boolean = false;

selectedValue: string = '';
  isOpen: boolean = false;

  options = [
    'PRESIDENTE',
    'VICEPRESIDENTE',
    'SECRETARIO',
    'TESORERO',
    'VOCAL'
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string): void {
    this.selectedValue = option;
    this.isOpen = false;
  }

  constructor(private candidatoService: CandidatoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private socioService: SocioService,
    private listaService: ListaService) { }


  ngOnInit(): void {
    this.candidato = {};
    this.candidatoESelected = {};

    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.listaService.getbyid(id).subscribe((result: any) => {
      this.lista = result as Lista;
      console.log(result);
    },
      error => { console.error });
    this.getAll(id);
    this.getAllProcesos()
    this.cols = [
      { field: "id", header: "ID" },
      { field: "evaluacion", header: "Evaluacion" },

    ];
  }


  getAll(id: number) {
    this.candidatoService.getAllbyLista(id).subscribe(
      (result: any) => {
        let candidatos: Candidato[] = [];
        for (let i = 0; i < result.length; i++) {
          let candidato = result[i] as Lista;
          candidatos.push(candidato);
        }
        this.candidatos = candidatos;
      },
      error => { console.error(); }
    )
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.candidatoESelected.id != null) {
        this.candidato = this.candidatoESelected;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Debe de seleccionar un registro" });
        return;
      }

    } else {
      this.candidato = {};
    }
    this.displaySaveDialog = true;
  }

  /*filterPersona(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side

    let query = event.query;
    this.socioService.getAll().subscribe(
      (result: any) => {
        console.log(result)
        let filtered: Socio[] = result;
        for (let i = 0; i < this.socios.length; i++) {
          let socio: Socio = this.socios[i];
          if (socio.persona.fullnombre!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(socio);
          }
        }
        this.filteredSocios = filtered;

      },
      error => {console.error(error);}
    )


  }*/
  filterPersona(event: { query: string }) {
    const query = event.query.toLowerCase();

    this.socioService.getAll().subscribe(
      (result: any) => {
        const socios = result.content
        console.log(result)
        // Filtra los resultados que coincidan con el nombre desde el backend
        this.filteredSocios = socios.filter((socio: Socio) =>
          socio.persona.fullnombre.toLowerCase().includes(query)
        );
      },
      error => {
        console.error('Error al obtener socios:', error);
      }
    );
  }


  save() {

    this.candidatoService.save(this.candidato, this.lista.id).subscribe(
      (result: any) => {
        let candidato = result as Candidato;
        candidato.cargo=this.selectedValue;
        console.log(candidato)
        this.validarProceso(candidato);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se ha creado el Candidato correctamente" });
        this.displaySaveDialog = false;
      },
      error => {
        console.log(Error);
      }
    );

  }
  validarProceso(candidato: Candidato) {
    let index = this.candidatos.findIndex((e) => e.id == candidato.id);

    if (index != -1) {
      this.candidatos[index] = candidato;
    } else {
      this.candidatos.push(candidato);
    }
  }

  getAllProcesos() {
    this.socioService.getAll().subscribe(
      (result: any) => {
        let socios2: Socio[] = [];
        for (let i = 0; i < result.content.length; i++) {
          let socio = result.content[i] as Socio;
          socios2.push(socio);
        }
        this.socios = socios2;
      },
      error => { console.error(); }
    )
  }

  delete() {
    if (this.candidatoESelected == null || this.candidatoESelected.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Debe de seleccionar un registro" });
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desa elimnar la Lista ?",
      accept: () => {
        this.candidatoService.delete(this.candidatoESelected.id).subscribe(
          (result: any) => {
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se ha eliminado la Lista correctamente" });
            this.deleteObject(this.candidatoESelected.id);
          }
        )
      }
    })
  }

  deleteObject(id?: number) {
    let index = this.candidatos.findIndex((e) => e.id == id);
    if (index != -1) {
      this.candidatos.splice(index, 1);
    }
  }

}
