import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogearseService } from './login.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formSignIn: FormGroup;
  email: string;
  errorMessage: String = "";

  constructor( protected router:Router, private formBuilder: FormBuilder, protected httpClient: HttpClient,
    private servicioLogin : LogearseService){}

  ngOnInit(): void {
    this.formSignIn = this.formBuilder.group({
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('',  Validators.required),
    });
  }

  signIn(){
    this.httpClient.post('http://localhost:3000/api/v1/user/signin', {
      'password': this.formSignIn.get('password').value,
      'email': this.formSignIn.get('email').value,
    }).subscribe(value => {
      var response = value;
      if(response === "UserNotConfirmedException") this.router.navigate(["confirm"])
      if(response === "ok") {
        localStorage.setItem("usuario", this.formSignIn.get('email').value)

        this.servicioLogin.disparadorDeLogin.emit({
          email: this.formSignIn.get('email').value,
          password: this.formSignIn.get('password').value,
        });
        this.router.navigate([""])
      }
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error.message;
    });
  }



  recoverPass(){
    alert("Todavia no esta desarrollada esta funcionalidad.")
  }
}
