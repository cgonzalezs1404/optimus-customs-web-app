import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {

  public email: string = 'cesar_1494@outlook.com';
  public user: string = 'Cesar Gonzalez';

  constructor(private sessionService: SessionService) {

  }

  public async logout(): Promise<void> {
    this.sessionService.clearSession();
  }
}
