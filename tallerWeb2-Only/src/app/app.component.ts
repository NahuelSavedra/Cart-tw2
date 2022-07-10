import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { AgregarAlCarritoService } from './components/lista-productos/agregar-al-carrito.service';
import { LogearseService } from './components/login/login.service';
import { Observable, share, Subject } from 'rxjs';
import { Product } from './components/lista-productos/product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tallerWeb2-Only';
  cantidadDePorductos = 0;


  constructor( protected router:Router, protected httpClient: HttpClient, private servicioCarrito : AgregarAlCarritoService,
    private servicioLogin : LogearseService){}

    public products:Array<any> = [];
    public loged: String = "";
    public isAdmin: Boolean = false;
    public viewModal : Boolean = false;
    public precioTotal : number =0;


  ngOnInit(): void {
      this.servicioLogin.disparadorDeLogin.subscribe(data => {
        this.loged = data.email;
        if(data.password === "Admin1234.") this.isAdmin = true;
      });
      this.servicioCarrito.disparadorDeCarrito.subscribe(products => {
        this.products = products
        this.cantidadDePorductos = this.products.length;
        this.CalcularPrecioTotal(products);
      })
  }

  cerrarSesion(){
    this.loged = "";
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    this.products = [];
    this.cantidadDePorductos = 0;
    this.router.navigate([""]);
  }

  abrirPopUp(){
    this.viewModal =  true;
  }

  cerrarPopUp(){
    this.viewModal =  false;
  }

  CalcularPrecioTotal(products : Array<Product>){
    this.precioTotal = 0;
    products.forEach(product => {
      this.precioTotal = this.precioTotal +  product.price;
    })
  }

  sacarReloj(product : Product){
    var index = this.products.indexOf(product)
    this.products.splice(index,1)
    this.cantidadDePorductos = this.products.length;
    this.precioTotal = this.precioTotal - product.price;
  }

  ConfirmarCompra(){
   let carrito = JSON.stringify(this.products);
   let user = localStorage.getItem("usuario")
   console.log(carrito,user)
   localStorage.setItem("carrito",carrito);
   this.viewModal =  false;
   this.router.navigate(['purchase']);
  }

}
