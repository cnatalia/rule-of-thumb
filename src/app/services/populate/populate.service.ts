import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';



import { catchError, tap, reduce, distinct, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PopulateService {
  // public url = `${environment.assets}/data/financial.json`
  public url = `assets/data/data.json`

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        tap((response: any) => console.log('Data ok! ')),
        map((response: any) => {return response.data
          .map( (data:any) => {
            return {
               ...data,
               total: data.votes.positive + data.votes.negative
              }}
        )}),
        catchError(this.handleError<any>('getData'))
      );
  }



  // public getVotes(): Observable<any> {
  //   return this.http.get<any>(this.url)
  //     .pipe(
  //       tap((response: any) => console.log('votes arrived yet!')),
  //       map((response: any) => {return response.data
  //         .map( (data:any) => {
  //           return {
  //              id: data.id,
  //              positive: data.votes.positive,
  //              negative: data.votes.negative,
  //              total: data.votes.positive + data.votes.negative
  //             }}
  //       )}),
  //       catchError(this.handleError<any>('getVotes'))
  //     );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }







}