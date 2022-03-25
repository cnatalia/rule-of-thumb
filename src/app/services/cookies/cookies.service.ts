import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor( private cookies: CookieService) {

   }

  public setCookie(id:string, data: {}){
    this.cookies.set(id ,JSON.stringify(data));
   }

  public getCookie(id:string){
     return this.cookies.get(id)
   }
}
