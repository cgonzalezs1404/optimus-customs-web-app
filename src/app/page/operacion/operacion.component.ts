import { Component, OnInit } from '@angular/core';
import * as service from '../../shared/service/service.index';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

  public estadoSelect: any[] = [];
  public giroSelect: any[] = [];
  public consumidorSelect: any[] = [];

  constructor(private giroService: service.GiroService, 
    private estadoService: service.EstadoService, 
    private consumidorService: service.ConsumidorService) {

  }

  async ngOnInit() {
    await this.createList();
  }

  public async getGiroData(filters: string): Promise<boolean> {
    const request = await this.giroService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this.giroSelect.push({ value: element.id, text: element.nombre });
    });
    this.giroSelect = [...this.giroSelect];
    return (request.status === 200) ? true : false;

  }

  public async getEstadoData(filters: string): Promise<boolean> {
    const request = await this.estadoService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this.estadoSelect.push({ value: element.id, text: element.nombre });
    });
    this.estadoSelect = [...this.estadoSelect];
    return (request.status === 200) ? true : false;

  }

  public async getConsumidorData(filters: string): Promise<boolean> {
    const request = await this.consumidorService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this.consumidorSelect.push({ value: element.id, text: element.razon_social });
    });
    this.consumidorSelect = [...this.consumidorSelect];
    return (request.status === 200) ? true : false;

  }


  private async createList() {

    const [estado, giro, consumidor] = await Promise.all([
      await this.getEstadoData('?page_size=9999&activo=true'),
      await this.getGiroData('?page_size=9999&activo=true'),
      await this.getConsumidorData('?page_size=9999&activo=true')
    ]);

    if ([estado, giro, consumidor, ].find(() => false)) { return; }
  }
}
