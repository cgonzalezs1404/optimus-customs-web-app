import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../service/service.index';

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
    private sessionService: SessionService
  ) {

  }
  async ngOnInit(): Promise<void> {
    this.session = await this.sessionService.getStorageData();
    if (this.session && JSON.stringify(this.session) !== '{}') {
      this.usuarioMenus = this.session.menu_configuration;
      this.userName = this.session.username;
    }
  }
}
