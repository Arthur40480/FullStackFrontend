import { Hotel } from "./hotel.model";

export class Manager {
    id : number;
    username : string;

    constructor(id:number, username: string){
        this.id = id;
        this.username = username;
    }
}