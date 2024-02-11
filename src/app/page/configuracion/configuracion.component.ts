import { Component, OnInit } from '@angular/core';
import * as service from '../../shared/service/service.index';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {

  public _usuarioSelect: any[] = [];
  public _menuSelect: any[] = [];
  public _privilegioSelect: any[] = [];

  constructor(private menuService: service.MenuService,
    private privilegioService: service.PrivilegioService,
    private usuarioService: service.UsuarioService) {

  }
  async ngOnInit(): Promise<void> {
    await this.createList();
  }

  public async getPrivilegioData(filters: string): Promise<boolean> {
    const request = await this.privilegioService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this._privilegioSelect.push({ value: element.id, text: element.nombre });
    });
    this._privilegioSelect = [...this._privilegioSelect];
    return (request.status === 200) ? true : false;

  }

  public async getUsuarioData(filters: string): Promise<boolean> {
    const request = await this.usuarioService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this._usuarioSelect.push({ value: element.id, text: `${element.nombres} ${element.apellido_paterno} ${element.apellido_materno}` });
    });
    this._usuarioSelect = [...this._usuarioSelect];
    return (request.status === 200) ? true : false;

  }

  public async getMenuData(filters: string): Promise<boolean> {
    const request = await this.menuService.getData(filters).then((resp) => resp);
    let data = [];
    if (request.status === 200) { data = request.body.data; } else { data = []; }
    data.forEach((element: any) => {
      this._menuSelect.push({ value: element.id, text: element.nombre });
    });
    this._menuSelect = [...this._menuSelect];
    return (request.status === 200) ? true : false;

  }

  private async createList(): Promise<void> {

    const [privilegio, usuario, menu] = await Promise.all([
      await this.getPrivilegioData('?page_size=9999&activo=true'),
      await this.getUsuarioData('?page_size=9999&activo=true'),
      await this.getMenuData('?page_size=9999&activo=true'),
    ]);

    if ([privilegio, usuario, menu].find(() => false)) { return; }
  }
}
