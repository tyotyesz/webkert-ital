import { Timestamp } from "@angular/fire/firestore";

export interface Order{
    id: string,
    szallitasi_adatok: string,
    items: string[],
    ido: Timestamp
}
