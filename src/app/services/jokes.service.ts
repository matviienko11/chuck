import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(query: string): Observable<any> {
    return this.http.get(environment.BASIC_URL + `?query=${query}`).pipe(catchError(err => err))
  }
}
