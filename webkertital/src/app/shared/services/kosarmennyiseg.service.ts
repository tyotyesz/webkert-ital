import { Injectable } from '@angular/core';
import { KosarMennyisegObject } from '../models/kosarmennyiseg';

@Injectable({
  providedIn: 'root'
})
export class KosarmennyisegService {

  constructor() { }

  getKosarByUserId(userId: number): any[] {
    return KosarMennyisegObject.filter(termek => termek.user_id === userId);
  }
}
