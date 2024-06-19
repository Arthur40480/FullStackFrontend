import { Hotel } from "./hotel.model";

export class Manager {
    id : number;
    username : string;
    roles: string[];
    managedHotels: Hotel[];

    constructor(id:number, username: string, roles: string[], managedHotels: Hotel[]){
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.managedHotels = managedHotels;
    }
}