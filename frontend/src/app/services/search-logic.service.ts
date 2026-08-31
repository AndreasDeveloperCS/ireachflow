import { EventEmitter, Injectable, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Email } from '../models/email-form';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchLogicService  implements OnDestroy {

  emailCollection:Observable<Email[]> = new Observable<Email[]>();
  emailCollectionScuscription: Subscription | undefined;


  private providedUrl: string = 'http://localhost:3000/api/report'; //'http://universities.hipolabs.com/search'

  public searchEmails: EventEmitter<Email[]> = new EventEmitter<Email[]>();

  @Output()
  public countries: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public emailsCollection: EventEmitter<Email[]> = new EventEmitter<Email[]>();


  @Output()
  public emailReportCollection: EventEmitter<Email[]> = new EventEmitter<Email[]>();
  private reportSubcription: Subscription | undefined;

  @Output()
  public validatedCountry: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.reportSubcription?.unsubscribe();
  }

  getReport(searched: any){
    const value = searched;
    console.log('getReport', searched);
    const params = new HttpParams()
          params.set('sortColumn', 'messageId');
          params.set('sort', 'messageId');
          params.set('orderBy', 'messageId');

    this.reportSubcription?.unsubscribe();

    this.reportSubcription = this.http.get<Email[]>(
      `${this.providedUrl}?page=0&size=2`, 
      { 
        params: params, 
        responseType: 'json',  
      }).subscribe((data) => {
        console.log('', data);
        
        const unique = [...new Set(data.map(item => {
          return item
        }))].filter((item, index, array) => {
            return  item;
        }).sort();

        this.emailsCollection.emit(unique);

        return unique;

    });

  }
}
