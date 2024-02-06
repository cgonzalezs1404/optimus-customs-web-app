import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrivilegioService, MenuService, SessionService, UsuarioPrivilegioService, UsuarioService } from '../../service/service.index';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent implements OnInit {

  public userName: string = '';
  public menus: any[] = [];
  public usuarioMenus: any[] = [];
  public session: any;

  constructor(
    private sessionService: SessionService,
    private usuarioService: UsuarioService,
    private usuarioPrivilegioService: UsuarioPrivilegioService,
    private menuPrivilegioService: MenuPrivilegioService,
    private menuService: MenuService,
  ) {

  }
  async ngOnInit(): Promise<void> {
    let usuarioResponse: any;
    let usuarioPrivilegioResponse: any;


    this.session = await this.sessionService.getStorageData();
    if (this.session && JSON.stringify(this.session) !== '{}') {
      var menuResult = await this.menuService.getData(`?page_size=9999&activo=true`);
      if (menuResult.status === 200) {
        this.menus = menuResult.body.data;
      }

      var usuarioResult = await this.usuarioService.getData(`?page_size=9999&activo=true&correo_electronico=${this.session.username}`);
      if (usuarioResult.status === 200) {
        usuarioResponse = usuarioResult.body.data[0];
        this.userName = `${usuarioResponse.nombres}`;
      }
    }

    var usuarioPrivResult = await this.usuarioPrivilegioService.getData(`?page_size=9999&activo=true&id_usuario=${usuarioResponse.id}`);
    if (usuarioPrivResult.status === 200) {
      usuarioPrivilegioResponse = usuarioPrivResult.body.data[0];
    }
    
    var menuPrivResult = await this.menuPrivilegioService.getData(`?page_size=9999&activo=true&id_privilegio=${usuarioPrivilegioResponse.id_privilegio}`);
    if (menuPrivResult.status === 200) {
      this.usuarioMenus = menuPrivResult.body.data;
    }

  }

  public catalogValue(id_menu: number) {
    return this.menus.find(t => t.id === id_menu);
  }
}
