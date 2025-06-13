import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string = '/';
  error: boolean = false;

  form: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required]],
  })
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/eleccion/proceso';
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const loginValues = this.form.value;

    this.authService.login(loginValues['email'], loginValues['password'])
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl])
        }
        , () => {
          this.error = true;
            this.messageService.add({severity:'error', summary: 'Credenciales incorrectas', detail: 'El usuario o contraseña es incorrecto'});
        })
  }

}
