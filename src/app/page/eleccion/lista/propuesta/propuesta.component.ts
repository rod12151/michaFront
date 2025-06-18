import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Propuesta } from 'src/app/page/interface/propuesta.interface';
import { PropuestaServiceService } from 'src/app/page/service/propuesta-service.service';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss']
})
export class PropuestaComponent implements OnInit {
  propuestas: Propuesta[] = [];
  propuesta: Propuesta = {};
  propuestaSelected: Propuesta = {};
  displaySaveDialog: boolean = false;
  idLista: number = 0;


  constructor(
    private propuestaService: PropuestaServiceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.idLista = id
    console.log(id)
    this.loadPropuestas(this.idLista);
  }
  loadPropuestas(id: number) {
    this.propuestaService.getByListaId(id).subscribe(data => this.propuestas = data);
    console.log(this.propuestas)
  }
  showSaveDialog(edit: boolean) {
    if (edit && this.propuestaSelected.id) {
      this.propuesta = { ...this.propuestaSelected };
    } else {
      this.propuesta = {};
    }
    this.displaySaveDialog = true;
  }

  save(id: number) {
    if (this.propuesta.id) {
      this.propuestaService.editar(this.propuesta.id, this.propuesta).subscribe(() => {
        this.loadPropuestas(id);
        this.displaySaveDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Propuesta actualizada correctamente' })
      });
    } else {
      this.propuestaService.save(id, this.propuesta).subscribe(() => {
        this.loadPropuestas(id);
        this.displaySaveDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Propuesta guardada correctamente' });
      });
    }

  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta propuesta?',
      accept: () => {
        this.propuestaService.delete(this.propuestaSelected.id!).subscribe(() => {
          
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Propuesta eliminada' });
        this.loadPropuestas(this.idLista);
        });
      }
    });
  }

}
