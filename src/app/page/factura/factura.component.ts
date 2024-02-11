import { Component, OnInit } from '@angular/core';
import * as service from '../../shared/service/service.index';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {

  public operacionSelect: any[] = [];
  public estadoSelect: any[] = [];

  constructor(
    private estadoService: service.EstadoService,
    private operacionService: service.OperacionService) {

  }
  async ngOnInit() {
    await this.createList();
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

  public async getOperacionData(filters: string): Promise<boolean> {
    const request = await this.operacionService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this.operacionSelect.push({ value: element.id, text: element.codigo });
    });
    this.operacionSelect = [...this.operacionSelect];
    return (request.status === 200) ? true : false;

  }

  private async createList() {

    const [estado, operacion] = await Promise.all([
      await this.getEstadoData('?page_size=9999&activo=true'),
      await this.getOperacionData('?page_size=9999&activo=true')
    ]);

    if ([estado, operacion].find(() => false)) { return; }
  }
}
