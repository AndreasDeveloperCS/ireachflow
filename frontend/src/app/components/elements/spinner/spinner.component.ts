import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnnerService } from 'src/app/services/spinnner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {

  color = 'warn';
  mode = 'determinate';
  
  value = 95;
  showText = 'Rating';

  @Input()
  isLoaded = true;

  constructor(
      private spinnnerService:SpinnnerService,
      private spinner: NgxSpinnerService
  ) {
    
  }
  
  ngOnInit(): void {
    this.spinnnerService.showSpinner.subscribe(flag => {
      //this.isLoaded = flag;
    });

    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.spinnnerService.showSpinner.unsubscribe();
  }

}
