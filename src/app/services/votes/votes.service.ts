import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';



import { catchError, tap, reduce, distinct, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  public url = `assets/data/data.json`
  public votes:[] = []
  constructor(private http: HttpClient) { }


  public getVotes(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        tap((response: any) => console.log('votes arrived yet!')),
        map((response: any) => {return response.data
          .map( (data:any) => {
            return [
              { id: data.id},
              { positive: data.votes.positive},
              { negative: data.votes.negative}
            ]}
        )}),
        catchError(this.handleError<any>('getVotes'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
