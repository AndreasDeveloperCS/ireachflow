import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/email-form';
import { PaginatedResource } from '../models/paginated-resource';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ReportQuery {
  page: number;
  size: number;
  sortProperty?: string;
  sortDirection?: 'asc' | 'desc';
  filterProperty?: string;
  filterRule?: string;
  filterValue?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchLogicService {

  public searchEmails: EventEmitter<Email[]> = new EventEmitter<Email[]>();

  @Output()
  public countries: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public validatedCountry: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getReport(query: ReportQuery): Observable<PaginatedResource<Email>> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('size', query.size);

    if (query.sortProperty && query.sortDirection) {
      params = params.set('sort', `${query.sortProperty}:${query.sortDirection}`);
    }

    if (query.filterProperty && query.filterRule && query.filterValue) {
      params = params.set('filter', `${query.filterProperty}:${query.filterRule}:${query.filterValue}`);
    }

    return this.http.get<PaginatedResource<Email>>(`${environment.apiUrl}report`, { params });
  }
}
