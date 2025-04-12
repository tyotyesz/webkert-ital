export class Termek {
  id: number;
  termeknev: string;
  termekara: number;
  kategoria: 'uditok' | 'alkoholos' | 'kulonleges';
  kepeleres: string;
  akciosAr: number;

  static termekId = 7;

  constructor(id: number, termeknev: string, termekara: number, kategoria: 'uditok' | 'alkoholos' | 'kulonleges', kepeleres: string, akciosAr: number) {
    this.id = id;
    this.termeknev = termeknev;
    this.termekara = termekara;
    this.kategoria = kategoria;
    this.kepeleres = kepeleres;
    this.akciosAr = akciosAr;
  }
}

export const TermekekObject: Termek[] = [
    {
        id: 1,
        termeknev: "Termék 1",
        termekara: 350,
        kategoria: 'alkoholos',
        kepeleres: '../../../assets/img/absolut.jpg',
        akciosAr: 300
    },
    {
        id: 2,
        termeknev: "Termék 2",
        termekara: 500,
        kategoria: 'alkoholos',
        kepeleres: '../../../assets/img/bacardi.jpg',
        akciosAr: 450
    },
    {
        id: 3,
        termeknev: "Termék 3",
        termekara: 250,
        kategoria: 'uditok',
        kepeleres: '../../../assets/img/fanta-bodza.jpg',
        akciosAr: 150
    },
    {
        id: 4,
        termeknev: "Termék 4",
        termekara: 300,
        kategoria: 'uditok',
        kepeleres: '../../../assets/img/fanta-szolo.jpg',
        akciosAr: 200
    },
    {
        id: 5,
        termeknev: "Termék 5",
        termekara: 400,
        kategoria: 'kulonleges',
        kepeleres: '../../../assets/img/armandchampagne.jpg',
        akciosAr: 200
    },
    {
        id: 6,
        termeknev: "Termék 6",
        termekara: 600,
        kategoria: 'kulonleges',
        kepeleres: '../../../assets/img/macallanpremiumwhisky.jpg',
        akciosAr: 450
    }
]
