import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.scss']
})
export class AuthenticationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
      public data: string,
      public dialogRef: MatDialogRef<string>) {
  }

  ngOnInit(): void {

  }

  onClose() {

    this.dialogRef.close();

  }

}