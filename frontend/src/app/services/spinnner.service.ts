import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnnerService {

  @Output()
  showSpinner:EventEmitter<boolean> = new EventEmitter(false);

  constructor() { }
 
}
