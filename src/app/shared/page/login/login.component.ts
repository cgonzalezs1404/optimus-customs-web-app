import { Component, OnInit } from '@angular/core';
import { UsuarioTokenService } from '../../service/usuario-token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../service/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  public loginFomSubmited: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private usuarioTokenService: UsuarioTokenService,
    private router: Router,
    private fb: FormBuilder) {

  }
  async ngOnInit(): Promise<void> {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public async login() {
    this.loginFomSubmited = true;
    if (this.loginForm.invalid) {
      return;
    }

    let payload: any = {
      username: this.loginForm.get('email').value,
      hashpassword: this.loginForm.get('password').value
    };

    var result = await this.usuarioTokenService.login(payload).then((response) => response).catch((error) => error);
    if (result.status === 200) {
      setTimeout(() => this.router.navigateByUrl('/home'), 1000);
    }

  }

}
