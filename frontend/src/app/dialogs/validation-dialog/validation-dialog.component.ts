import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss']
})
export class ValidationDialogComponent  implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
      public data: any,
      public dialogRef: MatDialogRef<string>) {
  }

  ngOnInit(): void {

  }

  onClose() {

    this.dialogRef.close();

  }

}
