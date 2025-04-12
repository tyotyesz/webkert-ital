import { Injectable } from '@angular/core';
import { KosarMennyisegObject } from '../models/kosarmennyiseg';
import { KosarObject } from '../models/kosar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  constructor() { }

  createKosar(ujKosar: any): Observable<any> {
    KosarObject.push(ujKosar);
    return of({success: true});
  }
  
}
