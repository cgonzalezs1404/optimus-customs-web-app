import { Component, OnInit } from '@angular/core';
import { UsuarioTokenService } from '../../service/usuario-token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  public loginFomSubmited: boolean = false;
  public _env = environment;

  constructor(
    private sessionService: SessionService,
    private usuarioTokenService: UsuarioTokenService,
    private router: Router,
    private fb: FormBuilder) {

  }
  async ngOnInit(): Promise<void> {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    var session = await this.sessionService.getStorageData();
    if (session) {
      this.router.navigate([this._env.app.home.route]);
    } else {
      this.router.navigate([this._env.app.login.route]);
    }
  }

  public async login() {
    this.loginFomSubmited = true;
    if (this.loginForm.invalid) {
      return;
    }

    let payload: any = {
      username: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    var result = await this.usuarioTokenService.login(payload).then((response) => response).catch((error) => error);
    if (result.status === 200) {
      this.sessionService.setStorageData(result.body);
      this.router.navigateByUrl('/home')
    }
    

  }

}
