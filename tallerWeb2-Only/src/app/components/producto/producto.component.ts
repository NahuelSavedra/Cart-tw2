import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { Product } from '../lista-productos/product';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: String;
  product: Product;
  statusApi: Boolean = true;

  constructor(protected router:Router, protected httpClient: HttpClient, private url: ActivatedRoute) {
    this.id = this.url.snapshot.paramMap.get('codigo')
  }

  ngOnInit(): void {
    this.traerProducto(this.id)
  }

  volver(){
    this.router.navigate(["lista-productos"])
  }

  traerProducto(id){
    let res: Observable<Product> =
    this.httpClient.get<Product>('http://localhost:3000/api/v1/products/'+id)
    .pipe(share());
    res.subscribe(
      value=> {
        this.product = value
      },
      error => {
        this.statusApi = false;
      });
  }

}
