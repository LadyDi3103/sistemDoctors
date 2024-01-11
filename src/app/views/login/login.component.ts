import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  public email: string = '';
  public emailError: string = '';
  public password: string = '';
  public passwordError: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    public loginService: LoginService,
   ) {

  }
  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    // debugger
    // Aquí puedes manejar la lógica de autenticación
    if (this.loginForm.valid && this.loginForm.value.email === 'juan@doctor.pe' && this.loginForm.value.password === "123456") {
      this.router.navigateByUrl('/dashboard');
      console.log('Formulario válido. Enviar datos al servidor.');
    } else {
      console.log('Formulario inválido. Verifica tus datos.');
      this.emailError = 'Por favor, ingrese un correo válido';
    }
  }
}




