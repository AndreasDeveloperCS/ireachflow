import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Email } from 'src/app/models/email-form';
import { SearchLogicService } from 'src/app/services/search-logic.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent {

  public displayedColumns: string[] = [
    'messageId',
    'mainSourceAddress',
    'mainTargetAddress',
    'isOpened',
    'emailSentDate',
    'isOpenedDate',
    'response',
    'accepted',
    'rejected',
    'envelopeTime',
    'messageTime',
    'messageSize',
    'ehlo'
  ];

  public emails: Email[] = [];

  public dataSource: MatTableDataSource<Email>  = new MatTableDataSource();

  private paginator: MatPaginator | undefined;
  private sort: MatSort | undefined;

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort)
  set matSorting(ms:MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  public isNotEmpty: boolean = false;

  constructor(public searcher: SearchLogicService) {
    this.dataSource = new MatTableDataSource(undefined);
  }

  ngOnInit(): void {

    this.searcher.emailCollection.subscribe(items => {
      this.isNotEmpty = items.length > 0;
      this.emails = items;
      this.dataSource = new MatTableDataSource(items);
    });

  }

  ngOnDestroy(): void {
    this.searcher.emailCollectionScuscription?.unsubscribe();
  }

  drop(event: CdkDragDrop<any[]>) {
     moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
