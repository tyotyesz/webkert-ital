export class Kosar{
    id: number;
    mennyi: number;
    user_id: number;
    productsid: number;

    static kosarId = 6;
    constructor(id: number, mennyi: number, user_id: number, productsid: number) {
        this.id = id;
        this.mennyi = mennyi;
        this.user_id = user_id;
        this.productsid = productsid;
    }

}

export const KosarObject: Kosar[] = [
    {
        id: 1,
        mennyi: 3,
        user_id: 1,
        productsid: 1
    },
    {
        id: 2,
        mennyi: 2,
        user_id: 1,
        productsid: 2
    },
    {
        
        id: 3,
        mennyi: 1,
        user_id: 1,
        productsid: 3
    },
    {
        id: 4,
        mennyi: 1,
        user_id: 2,
        productsid: 4
    },
    {
        id: 5,
        mennyi: 4,
        user_id: 2,
        productsid: 5
    }
]