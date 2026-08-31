import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationDialogComponent } from 'src/app/dialogs/authentication-dialog/authentication-dialog.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  private pw = "FastSenderHermes";
  constructor(

    private matDialog: MatDialog,
    private router: Router
  ) {

    const retreivedPassword = localStorage.getItem('affmailer-login');

    if(retreivedPassword != this.pw){
      const dialogRef = this.matDialog.open(AuthenticationDialogComponent, {
        panelClass: 'signin-fullscreen-dialog',
        // data: signInData,
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
        if(result == this.pw) {
          localStorage.setItem("affmailer-login", result);
        }
        if(result != this.pw)
          this.router.navigate(['main']);
      });
    }

  }

}
