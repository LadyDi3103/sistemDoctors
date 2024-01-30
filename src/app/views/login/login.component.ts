import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  public email: string = '';
  public emailError: string = '';
  public password: string = '';
  public passwordError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loginService: LoginService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  async onSubmit() {
    const { email, password } = this.loginForm.value;
    const response = await firstValueFrom(
      this.authService.login({ email, password })
    );
    console.log(
      this.authService.rol$.subscribe((res) => {
        console.log(res);
      }),
      'ESTE ES EL ROL'
    );

    console.log(response, 'RESPONSE');
  }
}
