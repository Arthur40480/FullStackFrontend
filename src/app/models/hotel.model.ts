import { City } from "./city.model";

export class Hotel {
    id: number;
    name: string;
    description: string;
    phoneNumber: string;
    adress: string;
    rating: number;
    review: number;
    roomAvailability: number;
    lowestRoomPrice: number;
    img: string;
    city: City;

    constructor(
      id: number,
      name: string,
      description: string,
      phoneNumber: string,
      adress: string,
      rating: number,
      roomAvailability: number,
      review: number,
      lowestRoomPrice: number,
      img: string,
      city: City
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.phoneNumber = phoneNumber;
      this.adress = adress;
      this.rating = rating;
      this.roomAvailability = roomAvailability;
      this.review = review;
      this.lowestRoomPrice = lowestRoomPrice;
      this.img = img;
      this.city = city;
    }
  }