export interface IGrocery {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    quantity: number;
    manufacturedDate:Date,
    expiryDate:Date
}

export class Grocery implements IGrocery {
    constructor(public id: number,
        public name: string,
        public description: string,
        public unitPrice: number,
        public quantity: number,
        public manufacturedDate:Date,
        public expiryDate:Date) { }
}