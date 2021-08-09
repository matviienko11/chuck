import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Joke} from "../interfaces/joke.interface";

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(environment.BASIC_URL + `movie`);
  }
}
