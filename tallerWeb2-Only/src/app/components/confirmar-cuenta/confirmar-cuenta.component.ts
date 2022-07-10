import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.css']
})
export class ConfirmarComponent implements OnInit {

  formConfirm: FormGroup;
  email: String;
  code: String;
  statusCode : Boolean;
  error: String = "";

  constructor( protected router:Router, private formBuilder: FormBuilder, protected httpClient: HttpClient){
  }

  ngOnInit(): void {
    this.statusCode = true;
    this.formConfirm = this.formBuilder.group({
      email: new FormControl('',  [Validators.required, Validators.email]),
      code: new FormControl('',  Validators.required),
    });
  }

  confirmAccount(){
      this.httpClient.post('http://localhost:3000/api/v1/user/confirm', {
        'code': this.formConfirm.get('code').value,
        'email': this.formConfirm.get('email').value,
      }).subscribe(value => {
        var response = value;
        if(response === "ok") this.router.navigate([""])
        if(response === "CodeMismatchException") this.statusCode= false;
      }, (error: HttpErrorResponse) => {
          console.log(error.error.message)
          this.error = "Ha ocurrido un error, intentelo mas tarde."
      });
    }
}

