import {EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LogearseService {
  @Output() disparadorDeLogin : EventEmitter<any> = new EventEmitter();
  constructor() { }
}
