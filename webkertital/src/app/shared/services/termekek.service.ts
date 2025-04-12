import { Injectable } from '@angular/core';
import { TermekekObject } from '../models/termekek';

@Injectable({
  providedIn: 'root'
})
export class TermekekService {

  constructor() { }

  getTermekekById(id: number): any{
    return TermekekObject.find(termek => termek.id === id) || null;
  }
}
