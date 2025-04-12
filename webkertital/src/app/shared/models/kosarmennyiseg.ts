export class KosarMennyiseg{
    user_id: number;
    mennyitermek: number;

    static kosarMennyisegId = 4;
    constructor(user_id: number, mennyitermek: number) {
        this.user_id = user_id;
        this.mennyitermek = mennyitermek;
    }
}

export const KosarMennyisegObject: KosarMennyiseg[] = [
    {
        user_id: 1,
        mennyitermek: 6
    },
    {
        user_id: 2,
        mennyitermek: 5
    },
    {
        user_id: 3,
        mennyitermek: 0
    }
    
    
]