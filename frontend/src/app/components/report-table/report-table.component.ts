import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Email } from 'src/app/models/email-form';
import { ReportQuery, SearchLogicService } from 'src/app/services/search-logic.service';

interface ColumnConfig {
  key: string;
  label: string;
  sortable: boolean;
}

const ALL_COLUMNS: ColumnConfig[] = [
  { key: 'messageId', label: 'Message Id', sortable: true },
  { key: 'mainSourceAddress', label: 'Source Address', sortable: true },
  { key: 'mainTargetAddress', label: 'Target Address', sortable: true },
  { key: 'isOpened', label: 'Opened', sortable: true },
  { key: 'emailSentDate', label: 'Sent', sortable: true },
  { key: 'isOpenedDate', label: 'Opened At', sortable: true },
  { key: 'response', label: 'Response', sortable: true },
  { key: 'accepted', label: 'Accepted', sortable: false },
  { key: 'rejected', label: 'Rejected', sortable: false },
  { key: 'envelopeTime', label: 'Envelope Time', sortable: true },
  { key: 'messageTime', label: 'Message Time', sortable: true },
  { key: 'messageSize', label: 'Size', sortable: true },
  { key: 'ehlo', label: 'Ehlo', sortable: false },
];

const FILTERABLE_COLUMNS: ColumnConfig[] = [
  { key: 'messageId', label: 'Message Id', sortable: false },
  { key: 'mainSourceAddress', label: 'Source Address', sortable: false },
  { key: 'mainTargetAddress', label: 'Target Address', sortable: false },
  { key: 'response', label: 'Response', sortable: false },
];

type OpenedFilter = 'all' | 'opened' | 'not-opened';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit, OnDestroy {

  public allColumns = ALL_COLUMNS;
  public filterableColumns = FILTERABLE_COLUMNS;

  public columnOrder: string[] = ALL_COLUMNS.map(c => c.key);
  public hiddenColumns = new Set<string>();

  public get displayedColumns(): string[] {
    return this.columnOrder.filter(key => !this.hiddenColumns.has(key));
  }

  public dataSource: MatTableDataSource<Email> = new MatTableDataSource<Email>();

  public totalItems = 0;
  public pageIndex = 0;
  public pageSize = 10;

  public sortProperty?: string;
  public sortDirection: 'asc' | 'desc' | '' = '';

  public filterColumn = 'mainTargetAddress';
  public filterText = '';
  public openedFilter: OpenedFilter = 'all';

  public loading = false;
  public errorMessage = '';

  private filterChanged = new Subject<string>();

  constructor(public searcher: SearchLogicService) { }

  ngOnInit(): void {
    this.filterChanged.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.pageIndex = 0;
      this.fetch();
    });

    this.fetch();
  }

  ngOnDestroy(): void {
    this.filterChanged.unsubscribe();
  }

  private fetch(): void {
    this.loading = true;
    this.errorMessage = '';

    const query: ReportQuery = {
      page: this.pageIndex,
      size: this.pageSize,
    };

    if (this.sortProperty && this.sortDirection) {
      query.sortProperty = this.sortProperty;
      query.sortDirection = this.sortDirection;
    }

    if (this.openedFilter !== 'all') {
      query.filterProperty = 'isOpened';
      query.filterRule = 'eq';
      query.filterValue = this.openedFilter === 'opened' ? 'true' : 'false';
    } else if (this.filterText.trim()) {
      query.filterProperty = this.filterColumn;
      query.filterRule = 'like';
      query.filterValue = this.filterText.trim();
    }

    this.searcher.getReport(query).subscribe({
      next: result => {
        this.dataSource = new MatTableDataSource<Email>(result.items);
        this.totalItems = result.totalItems;
        this.loading = false;
      },
      error: () => {
        this.dataSource = new MatTableDataSource<Email>([]);
        this.totalItems = 0;
        this.errorMessage = 'Could not load the report. Please try again.';
        this.loading = false;
      },
    });
  }

  refresh(): void {
    this.fetch();
  }

  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetch();
  }

  onSortChange(sort: Sort): void {
    this.sortProperty = sort.direction ? sort.active : undefined;
    this.sortDirection = sort.direction as 'asc' | 'desc' | '';
    this.pageIndex = 0;
    this.fetch();
  }

  onFilterTextChange(value: string): void {
    this.filterText = value;
    this.filterChanged.next(value);
  }

  onFilterColumnChange(): void {
    if (this.filterText.trim()) {
      this.pageIndex = 0;
      this.fetch();
    }
  }

  clearFilter(): void {
    this.filterText = '';
    this.pageIndex = 0;
    this.fetch();
  }

  setOpenedFilter(value: OpenedFilter): void {
    this.openedFilter = value;
    this.pageIndex = 0;
    this.fetch();
  }

  toggleColumn(key: string): void {
    if (this.hiddenColumns.has(key)) {
      this.hiddenColumns.delete(key);
    } else {
      this.hiddenColumns.add(key);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columnOrder, event.previousIndex, event.currentIndex);
  }

  isSuccessResponse(response: string): boolean {
    return !!response && response.trim().startsWith('2');
  }

  formatSize(bytes: number): string {
    if (bytes == null) {
      return '';
    }
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  exportCsv(): void {
    const rows = this.dataSource.data;
    if (!rows.length) {
      return;
    }

    const columns = this.displayedColumns;
    const header = columns.map(key => this.allColumns.find(c => c.key === key)?.label ?? key);
    const lines = [header, ...rows.map(row => columns.map(key => this.csvCell((row as any)[key])))];
    const csv = lines.map(line => line.map(cell => this.escapeCsv(cell)).join(',')).join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report-page-${this.pageIndex + 1}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private csvCell(value: any): string {
    if (Array.isArray(value)) {
      return value.join('; ');
    }
    return value ?? '';
  }

  private escapeCsv(value: string): string {
    const stringValue = String(value);
    if (/[",\r\n]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }
}
