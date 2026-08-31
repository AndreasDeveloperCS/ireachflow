import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers: HttpHeaders = new HttpHeaders();
  http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.headers.set("Content-Type", "application/json; charset=utf-8");
    this.headers.set("Accept", "application/json");

    // this.headers.set("Origin", "*");
    // this.headers.set("Access-Control-Allow-Origin", '*');

    //this.headers.set("Connection", "keep-alive");
    //this.headers.set("Accept-Encoding", "gzip, deflate, br");

    this.headers.append("Content-Type", "application/json; charset=utf-8");
    this.headers.append("Accept", "application/json");
  }
  
}
