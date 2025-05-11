export interface Felhasznalo{
    id: string,
    vezeteknev: string,
    keresztnev: string,
    email: string,
    telefonszam: string,
    szallitasi_adatok: string,
    admin: boolean,
    fizetesi_adatok: string,
    hirlevelsub: string,
    kosar: string[],
    orders: string[]
}