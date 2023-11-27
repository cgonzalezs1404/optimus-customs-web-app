import { Component, OnInit } from '@angular/core';
import { UsuarioTokenService } from '../../../shared/service/usuario-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private usuarioTokenService: UsuarioTokenService) {

  }
  async ngOnInit(): Promise<void> {
    this.login();
  }

  private async login() {
    let payload: any = {
      username: "cesar_1494@outlook.com",
      hashpassword: "Optimus2023"
    };
    var result = await this.usuarioTokenService.login(payload).then((response) => response).catch((error) => error);
    console.log(result);
  }

}
