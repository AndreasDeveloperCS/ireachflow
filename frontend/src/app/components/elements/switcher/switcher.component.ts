import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  @Input()
  public confirmationText: string = '';

  @Input()
  public refusionText: string = '';

  @Output()
  public confirmationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public confirmed: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  valueChanged($event: any) {
    this.confirmed = !this.confirmed;
    this.confirmationChanged.emit(this.confirmed);
  }
}
