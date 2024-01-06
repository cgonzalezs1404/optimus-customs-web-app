import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as localService from '../../service/service.index';


@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

  @ViewChild('modalView', { read: TemplateRef }) _modalView: TemplateRef<any> | any;
  public _modalRef?: BsModalRef;

  public giroSelect: any[] = [];
  public estadoSelect: any[] = [];
  public consumidorSelect: any[] = [];

  public modalConfig: any = {
    backdrop: true,
    keyboard: true,
    ignoreBackdropClick: true,
    animated: true,
    class: 'modal-lg'
  };

  constructor(
    private modalService: BsModalService,
    private giroService: localService.GiroService,
    private estadoService: localService.EstadoService,
    private consumidorService: localService.ConsumidorService,
  ) {

  }

  public async ngOnInit(): Promise<void> {
    await this.createList();
  }

  private async createList() {
    let response = await this.giroService.get('').then((resp) => resp);
    let giroList = response.body.data;

    giroList.forEach((element: any) => {
      this.giroSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.estadoService.get('').then((resp) => resp);
    let estadoList = response.body.data;

    estadoList.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });

    response = await this.consumidorService.get('').then((resp) => resp);
    let consumidorList = response.body.data;

    consumidorList.forEach((element: any) => {
      this.consumidorSelect.push({ value: element.id, text: element.razon_social });
    });
  }


  public modalShow(template: TemplateRef<void>): void {
    this._modalRef = this.modalService.show(template, this.modalConfig);
  }
}
