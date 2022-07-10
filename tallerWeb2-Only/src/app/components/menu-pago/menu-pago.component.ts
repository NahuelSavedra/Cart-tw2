import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu-pago',
  templateUrl: './menu-pago.component.html',
  styleUrls: ['./menu-pago.component.css']
})
export class PagoComponent implements OnInit {

  formPurchase: FormGroup;
  email: String;
  error: String = "";

  constructor( protected router:Router, private formBuilder: FormBuilder, protected httpClient: HttpClient){}

  ngOnInit(): void {
    this.formPurchase = this.formBuilder.group({
      numero: new FormControl('',  Validators.required),
      cvv: new FormControl('',  Validators.required),
      mes: new FormControl('',  Validators.required),
      año: new FormControl('',  Validators.required),
      titular: new FormControl('',  Validators.required),
    });
  }

  confirmPurchase(){
      this.httpClient.post('http://localhost:3000/api/v1/compra/nuevaCompra', {
        'carrito': localStorage.getItem('carrito'),
        'usuario':localStorage.getItem('usuario'),
      }).subscribe(value => {
        var response = value
        if(response == "ok"){
          alert("Compra realizada");
          this.router.navigate([""]);
        }
      }, (error: HttpErrorResponse) => {
         console.log(error.error.message)
         this.error = "Ha ocurrido un error, intentelo mas tarde."
      });
    }
}

