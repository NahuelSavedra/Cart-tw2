import {EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AgregarAlCarritoService {
  @Output() disparadorDeCarrito : EventEmitter<any> = new EventEmitter();
  constructor() { }
}
