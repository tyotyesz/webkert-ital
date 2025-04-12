export class Felhasznalo{
    id: number;
    vezeteknev: string;
    keresztnev: string;
    email: string;
    jelszo: string;
    telefonszam: string;
    szallitasi_adatok: string;
    admin: boolean;
    fizetesi_adatok: string;
    hirlevelsub: string;

    static felhaszId = 4;
    constructor(id: number, vezeteknev: string, keresztnev: string, email: string, jelszo: string, telefonszam: string, szallitasi_adatok: string, admin: boolean, fizetesi_adatok: string, hirlevelsub: string) {
        this.id = id;
        this.vezeteknev = vezeteknev;
        this.keresztnev = keresztnev;
        this.email = email;
        this.jelszo = jelszo;
        this.telefonszam = telefonszam;
        this.szallitasi_adatok = szallitasi_adatok;
        this.admin = admin;
        this.fizetesi_adatok = fizetesi_adatok;
        this.hirlevelsub = hirlevelsub;
    }
}

export const FelhasznalokObject: Felhasznalo[] = [
    {
        id: 1,
        vezeteknev: "Kiss",
        keresztnev: "Janos",
        email: "janos.kiss@example.com",
        jelszo: "jelszo123",
        telefonszam: "+36123456789",
        szallitasi_adatok: "Fo utca 1.",
        admin: true,
        fizetesi_adatok: "kartya",
        hirlevelsub: "igen"
    },
    {
        
        id: 2,
        vezeteknev: "Nagy",
        keresztnev: "Anna",
        email: "anna.nagy@example.com",
        jelszo: "jelszo456",
        telefonszam: "+36123456780",
        szallitasi_adatok: "Bar utca 2.",
        admin: false,
        fizetesi_adatok: "utanvet",
        hirlevelsub: "nem"
    },
    {
        
        id: 3,
        vezeteknev: "Szabo",
        keresztnev: "Peter",
        email: "peter.szabo@example.com",
        jelszo: "jelszo789",
        telefonszam: "+36123456781",
        szallitasi_adatok: "Kert utca 3.",
        admin: false,
        fizetesi_adatok: "kartya",
        hirlevelsub: "igen"
    }
]