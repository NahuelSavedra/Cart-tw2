import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NewProductComponent implements OnInit{
  formNewProduct: FormGroup;

  constructor( protected router:Router, private formBuilder: FormBuilder, protected httpClient: HttpClient){}
  ofert: Boolean = true;
  errorMessage: String = "";

  ngOnInit(): void {
    this.formNewProduct = this.formBuilder.group({
      name: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      codigo: new FormControl('',  [Validators.required, Validators.minLength(6)]),
      price: new FormControl('',  [Validators.required, Validators.min(10)]),
      details: new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      img: new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      ofert: new FormControl(true,  Validators.required),
      desc: new FormControl(0,  [Validators.required, Validators.min(0), Validators.max(100)]),
      cantidad: new FormControl('',  [Validators.required, Validators.min(1), Validators.max(100)]),
    });
  }

  changeOfert(){
    this.ofert = !this.ofert;
  }

  createProduct(){
    this.httpClient.post('http://localhost:3000/api/v1/products/newProduct', {
      'name': this.formNewProduct.get('name').value,
      'codigo': this.formNewProduct.get('codigo').value,
      'price': this.formNewProduct.get('price').value,
      'details': this.formNewProduct.get('details').value,
      'img': this.formNewProduct.get('img').value,
      'ofert': this.ofert,
      'desc': this.formNewProduct.get('desc').value,
      'cantidad': this.formNewProduct.get('cantidad').value,
    }).subscribe(value => {
      var response = value
      if(response == "ok"){
        this.router.navigate(['/lista-productos']);
      }
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error.message;
    });
  }
}
